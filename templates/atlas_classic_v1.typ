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
    coursework: "Kursy / przedmioty",
    role_context: "Rola / kontekst"
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
    coursework: "Coursework",
    role_context: "Role / context"
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
  coursework: "Kursy / przedmioty",
  role_context: "Rola / kontekst"
))

#set text(
  font: ("Times New Roman", "Georgia", "Calibri", "Arial"),
  size: 10pt,
  fill: rgb("#111827"),
  lang: lang,
  ligatures: false
)

#set page(
  margin: (top: 0.5in, bottom: 0.5in, left: 0.6in, right: 0.6in),
  paper: "a4",
)

#set par(
  justify: true,
  leading: 0.65em,
)

#show link: underline
#show link: set text(fill: rgb("#1e3a8a"))

#show heading: set block(sticky: true, above: 1.2em, below: 0.6em)

#show heading.where(level: 2): it => [
  #pad(top: 0.4em, bottom: -0.6em, text(weight: "bold", size: 11pt)[#smallcaps(it.body)])
  #line(length: 100%, stroke: 0.8pt + rgb("#374151"))
]

#show heading.where(level: 1): it => [
  #set align(left)
  #set text(weight: 700, size: 22pt, fill: rgb("#111827"))
  #pad(bottom: 0.1em, it.body)
]

#let dates-helper(start-date, end-date) = {
  if start-date == "" and end-date == "" { "" }
  else if start-date == "" { end-date }
  else if end-date == "" or end-date == "present" or end-date == "Present" or end-date == "PRESENT" or end-date == "obecnie" or end-date == "Obecnie" or end-date == "OBECNIE" { 
    start-date + " – " + i18n.present 
  }
  else { start-date + " – " + end-date }
}

#let clean-url(url) = url.replace("https://", "").replace("http://", "")

= #(cv.basics.at("name", default: ""))

#pad(
  top: 0.2em,
  bottom: 0.8em,
  align(left)[
    #{
      let items = ()
      if cv.basics.at("phone", default: "") != "" { items.push(cv.basics.phone) }
      if cv.basics.at("location", default: "") != "" { items.push(cv.basics.location) }
      if cv.basics.at("email", default: "") != "" { items.push(link("mailto:" + cv.basics.email)[#cv.basics.email]) }
      for (_, url) in cv.basics.at("urls", default: (:)) {
        if url != "" {
          let safe-url = clean-url(url)
          items.push(link("https://" + safe-url)[#safe-url])
        }
      }
      items.join("  |  ")
    }
  ]
)

#if cv.basics.at("summary", default: "") != "" [
  == #i18n.summary
  #cv.basics.summary
]

#if cv.at("experience", default: ()).len() > 0 [
  == #i18n.experience
  #for exp in cv.experience [
    #block(width: 100%, above: 0.8em, below: 0.4em)[
      #strong(exp.at("position", default: "")) #h(1fr) #dates-helper(exp.at("startDate", default: ""), exp.at("endDate", default: "")) \
      #exp.at("company", default: "") #h(1fr) #emph(exp.at("location", default: ""))
    ]
    #if exp.at("highlights", default: ()).len() > 0 [
      #for item in exp.highlights [
        - #item
      ]
    ]
  ]
]

#if cv.at("education", default: ()).len() > 0 [
  == #i18n.education
  #for edu in cv.education [
    #block(width: 100%, above: 0.8em, below: 0.4em)[
      #strong(edu.at("institution", default: "")) #h(1fr) #dates-helper(edu.at("startDate", default: ""), edu.at("endDate", default: "")) \
      #emph(edu.at("degree", default: "") + if edu.at("field", default: "") != "" { " – " + edu.at("field", default: "") } else { "" }) #h(1fr) #emph(edu.at("gpa", default: ""))
    ]
    #if edu.at("coursework", default: ()).len() > 0 [
      - *#i18n.coursework*: #edu.coursework.join(", ")
    ]
  ]
]

#if cv.at("projects", default: ()).len() > 0 [
  == #i18n.projects
  #for proj in cv.projects [
    #block(width: 100%, above: 0.8em, below: 0.4em)[
      *#proj.at("name", default: "")* #if proj.at("url", default: "") != "" [
        #{
          let safe-url = clean-url(proj.at("url", default: ""))
          [ (#link("https://" + safe-url)[#safe-url])]
        }
      ] #h(1fr) #emph(proj.at("period", default: ""))
    ]
    #if proj.at("role", default: "") != "" or proj.at("organization", default: "") != "" [
      - *#i18n.role_context*: #proj.at("role", default: "")#if proj.at("role", default: "") != "" and proj.at("organization", default: "") != "" { " - " } else { "" }#proj.at("organization", default: "")
    ]
    #if proj.at("description", default: "") != "" [
      - #proj.description
    ]
    #if proj.at("keywords", default: ()).len() > 0 [
      - *#i18n.technologies*: #proj.keywords.join(", ")
    ]
    #if proj.at("highlights", default: ()).len() > 0 [
      #for item in proj.highlights [
        - #item
      ]
    ]
  ]
]

#if cv.at("skills", default: ()).len() > 0 [
  == #i18n.skills
  #for skill in cv.skills [
    - *#skill.at("category", default: "")*: #skill.at("keywords", default: ()).join(", ")
  ]
]

#if cv.at("certifications", default: ()).len() > 0 [
  == #i18n.certifications
  #for cert in cv.certifications [
    #block(width: 100%, above: 0.6em, below: 0.3em)[
      *#cert.at("name", default: "")*, #cert.at("issuer", default: "") #h(1fr) #cert.at("date", default: "")
    ]
  ]
]

#if cv.at("languages", default: ()).len() > 0 [
  == #i18n.languages
  #for lang_item in cv.languages [
    - *#lang_item.at("language", default: "")*: #lang_item.at("fluency", default: "")
  ]
]
