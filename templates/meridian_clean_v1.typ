#let cv = json(sys.inputs.at("data_path", default: "../schemas/example_resume.json"))
#let lang = cv.metadata.at("language", default: "pl")
#set document(
  author: cv.basics.at("name", default: if lang == "en" { "Candidate" } else { "Kandydat" }),
  title: (if lang == "en" { "Resume - " } else { "CV - " }) + cv.basics.at("name", default: if lang == "en" { "Candidate" } else { "Kandydat" })
)

#let i18n = (
  pl: (
    summary: "Podsumowanie zawodowe",
    experience: "Doświadczenie zawodowe",
    education: "Wykształcenie",
    skills: "Umiejętności",
    projects: "Projekty",
    certifications: "Certyfikaty",
    languages: "Języki obce",
    present: "obecnie",
    technologies: "Technologie",
    coursework: "Kursy / przedmioty"
  ),
  en: (
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    languages: "Languages",
    present: "Present",
    technologies: "Technologies",
    coursework: "Coursework"
  )
).at(lang, default: (
  summary: "Podsumowanie zawodowe",
  experience: "Doświadczenie zawodowe",
  education: "Wykształcenie",
  skills: "Umiejętności",
  projects: "Projekty",
  certifications: "Certyfikaty",
  languages: "Języki obce",
  present: "obecnie",
  technologies: "Technologie",
  coursework: "Kursy / przedmioty"
))

#set text(
  font: ("Arial", "Segoe UI", "Calibri", "Tahoma", "Verdana"),
  size: 10pt,
  fill: rgb("#1f2937"),
  lang: lang,
  ligatures: false
)

#set page(
  margin: (top: 0.6in, bottom: 0.6in, left: 0.6in, right: 0.6in),
  paper: "a4",
)

#set par(
  justify: true,
  leading: 0.6em,
)

#show link: underline
#show link: set text(fill: rgb("#0f766e"))

#show heading: set block(sticky: true, above: 1.2em, below: 0.6em)

#show heading.where(level: 1): it => pad(bottom: 0.4em, top: 0.6em, stack(
  spacing: 0.3em,
  text(weight: "bold", size: 12pt, fill: rgb("#111827"), smallcaps(it.body)),
  line(length: 100%, stroke: 0.8pt + rgb("#d1d5db")),
))
#let dates-helper(start-date, end-date) = {
  if start-date == "" and end-date == "" { "" }
  else if start-date == "" { end-date }
  else if end-date == "" or end-date == "present" or end-date == "Present" or end-date == "PRESENT" or end-date == "obecnie" or end-date == "Obecnie" or end-date == "OBECNIE" { 
    start-date + " – " + i18n.present 
  }
  else { start-date + " – " + end-date }
}

#let clean-url(url) = url.replace("https://", "").replace("http://", "")

#let record(primary: "", secondary: "", timespan: "", location: "", body) = pad(left: 0.4em, bottom: 0.8em, stack(
  spacing: 0.6em,
  grid(
    columns: (1fr, auto),
    row-gutter: 0.4em,
    strong(primary), align(right, timespan),
    text(size: 0.95em, emph(secondary)), align(right, text(size: 0.95em, emph(location))),
  ),
  if body != [] { pad(left: 0.4em, top: 0.2em, text(size: 0.95em, body)) } else { [] }
))

#let skills-grid(items) = pad(left: 0.4em, bottom: 0.6em, grid(
  columns: (auto, 1fr),
  row-gutter: 0.8em,
  column-gutter: 1.5em,
  ..items.map(item => (strong(item.at("category", default: item.at("name", default: ""))), item.at("keywords", default: ()).join(", "))).flatten(),
))

#grid(
  columns: (1fr, auto),
  gutter: 2em,
  align(bottom, stack(
    spacing: 0.6em,
    text(size: 24pt, weight: "bold", fill: rgb("#111827"))[#cv.basics.at("name", default: "")]
  )),
  align(right, stack(
    spacing: 0.35em,
    if cv.basics.at("phone", default: "") != "" [ #cv.basics.phone ],
    if cv.basics.at("location", default: "") != "" [ #cv.basics.location ],
    if cv.basics.at("email", default: "") != "" [ #link("mailto:" + cv.basics.email)[#cv.basics.email] ]
  ))
)

#if cv.basics.at("summary", default: "") != "" [
  = #i18n.summary
  #pad(left: 0.4em, bottom: 0.6em, cv.basics.summary)
]

#if cv.at("experience", default: ()).len() > 0 [
  = #i18n.experience
  #for exp in cv.experience [
    #record(
      primary: exp.at("position", default: ""),
      secondary: exp.at("company", default: ""),
      timespan: dates-helper(exp.at("startDate", default: ""), exp.at("endDate", default: "")),
      location: exp.at("location", default: ""),
      if exp.at("highlights", default: ()).len() > 0 [
        #for item in exp.highlights [
          - #item
        ]
      ] else [ [] ]
    )
  ]
]

#if cv.at("education", default: ()).len() > 0 [
  = #i18n.education
  #for edu in cv.education [
    #record(
      primary: edu.at("degree", default: "") + if edu.at("field", default: "") != "" { " – " + edu.at("field", default: "") } else { "" },
      secondary: edu.at("institution", default: ""),
      timespan: dates-helper(edu.at("startDate", default: ""), edu.at("endDate", default: "")),
      location: edu.at("gpa", default: ""),
      if edu.at("coursework", default: ()).len() > 0 [
        *#i18n.coursework*: #edu.coursework.join(", ")
      ] else [ [] ]
    )
  ]
]

#if cv.at("projects", default: ()).len() > 0 [
  = #i18n.projects
  #for proj in cv.projects [
    #record(
      primary: proj.at("name", default: ""),
      secondary: if proj.at("url", default: "") != "" { 
        let safe-url = clean-url(proj.at("url", default: ""))
        link("https://" + safe-url)[#safe-url]
      } else { "" },
      timespan: proj.at("period", default: ""),
      location: if proj.at("role", default: "") != "" and proj.at("organization", default: "") != "" {
        proj.at("role", default: "") + " - " + proj.at("organization", default: "")
      } else if proj.at("role", default: "") != "" {
        proj.at("role", default: "")
      } else {
        proj.at("organization", default: "")
      },
      if proj.at("description", default: "") != "" or proj.at("keywords", default: ()).len() > 0 or proj.at("highlights", default: ()).len() > 0 [
        #if proj.at("description", default: "") != "" [ #proj.description ]
        #if proj.at("keywords", default: ()).len() > 0 [
          \ *#i18n.technologies*: #proj.keywords.join(", ")
        ]
        #if proj.at("highlights", default: ()).len() > 0 [
          #for item in proj.highlights [
            \ - #item
          ]
        ]
      ] else [ [] ]
    )
  ]
]

#if cv.at("skills", default: ()).len() > 0 [
  = #i18n.skills
  #skills-grid(cv.skills)
]

#if cv.at("certifications", default: ()).len() > 0 [
  = #i18n.certifications
  #for cert in cv.certifications [
    #record(
      primary: cert.at("name", default: ""),
      secondary: cert.at("issuer", default: ""),
      timespan: cert.at("date", default: ""),
      location: "",
      []
    )
  ]
]

#if cv.at("languages", default: ()).len() > 0 [
  = #i18n.languages
  #skills-grid(cv.languages.map(l => (name: l.at("language", default: ""), keywords: (l.at("fluency", default: ""),))))
]
