#import "summit_serif_utils.typ": *

#let cv = json(sys.inputs.at("data_path", default: "../schemas/example_resume.json"))
#let lang = cv.metadata.at("language", default: "pl")

#let labels = (
  pl: (
    candidate: "Kandydat",
    document: "CV - ",
    summary: "Podsumowanie zawodowe",
    work: "Doświadczenie zawodowe",
    education: "Wykształcenie",
    projects: "Projekty",
    certifications: "Certyfikaty",
    skills: "Umiejętności, języki",
    issuedBy: "Wystawca",
    coursework: "Kursy",
    details: "Szczegóły",
    languages: "Języki",
  ),
  en: (
    candidate: "Candidate",
    document: "Resume - ",
    summary: "Professional Summary",
    work: "Work Experience",
    education: "Education",
    projects: "Projects",
    certifications: "Licenses and Certifications",
    skills: "Skills, Languages",
    issuedBy: "Issued by",
    coursework: "Courses",
    details: "Details",
    languages: "Languages",
  ),
).at(lang, default: (
  candidate: "Kandydat",
  document: "CV - ",
  summary: "Podsumowanie zawodowe",
  work: "Doświadczenie zawodowe",
  education: "Wykształcenie",
  projects: "Projekty",
  certifications: "Certyfikaty",
  skills: "Umiejętności, języki",
  issuedBy: "Wystawca",
  coursework: "Kursy",
  details: "Szczegóły",
  languages: "Języki",
))

#set document(
  author: cv.basics.at("name", default: labels.candidate),
  title: labels.document + cv.basics.at("name", default: labels.candidate),
)

#let safe_url(url) = {
  if url == none { none }
  let raw = str(url).trim()
  if raw == "" {
    none
  } else if raw.starts-with("http://") or raw.starts-with("https://") {
    raw
  } else {
    "https://" + raw
  }
}

#let display_url(url) = {
  let normalized = safe_url(url)
  if normalized == none { none } else { normalized.replace("https://", "").replace("http://", "") }
}

#let compact_location(city, country, fallback: "") = {
  let parts = ()
  if country != "" { parts.push(country) }
  if city != "" { parts.push(city) }
  if parts.len() > 0 { parts.join(", ") } else { fallback }
}

#let urls_to_profiles(urls) = {
  let profiles = ()
  for (network, value) in urls.pairs() {
    let normalized = safe_url(value)
    if normalized != none {
      profiles.push((network: network, url: normalized))
    }
  }
  profiles
}

#let work_items = {
  let items = ()
  for exp in cv.at("experience", default: ()) {
    items.push((
      organization: exp.at("company", default: ""),
      location: exp.at("location", default: ""),
      positions: ((
        position: exp.at("position", default: ""),
        startDate: exp.at("startDate", default: ""),
        endDate: exp.at("endDate", default: ""),
        highlights: if exp.at("highlights", default: ()).len() > 0 { exp.highlights } else { exp.at("responsibilities", default: ()) },
      ),),
    ))
  }
  items
}

#let education_items = {
  let items = ()
  for edu in cv.at("education", default: ()) {
    let honors = ()
    if edu.at("gpa", default: "") != "" { honors.push(edu.gpa) }

    items.push((
      institution: edu.at("institution", default: ""),
      location: edu.at("location", default: ""),
      area: edu.at("field", default: ""),
      studyType: edu.at("degree", default: ""),
      startDate: edu.at("startDate", default: ""),
      endDate: edu.at("endDate", default: ""),
      honors: honors,
      courses: edu.at("coursework", default: ()),
      highlights: (),
    ))
  }
  items
}

#let project_items = {
  let items = ()
  for proj in cv.at("projects", default: ()) {
    let highlights = ()
    if proj.at("description", default: "") != "" { highlights.push(proj.description) }
    for item in proj.at("highlights", default: ()) { highlights.push(item) }
    if proj.at("keywords", default: ()).len() > 0 {
      highlights.push("*Tech:* " + proj.keywords.join(", "))
    }

    items.push((
      name: proj.at("name", default: ""),
      url: safe_url(proj.at("url", default: "")),
      affiliation: if proj.at("role", default: "") != "" and proj.at("organization", default: "") != "" {
        proj.role + " / " + proj.organization
      } else if proj.at("role", default: "") != "" {
        proj.role
      } else {
        proj.at("organization", default: "")
      },
      startDate: proj.at("startDate", default: ""),
      endDate: proj.at("endDate", default: ""),
      highlights: highlights,
    ))
  }
  items
}

#let certificate_items = {
  let items = ()
  for cert in cv.at("certifications", default: ()) {
    items.push((
      name: cert.at("name", default: ""),
      date: cert.at("date", default: ""),
      issuer: cert.at("issuer", default: ""),
      url: safe_url(cert.at("url", default: "")),
      id: "",
      details: cert.at("details", default: ""),
    ))
  }
  items
}

#let personal = (
  name: cv.basics.at("name", default: ""),
  email: cv.basics.at("email", default: ""),
  phone: cv.basics.at("phone", default: ""),
  url: safe_url(cv.basics.at("urls", default: (:)).at("website", default: cv.basics.at("urls", default: (:)).at("portfolio", default: ""))),
  titles: if cv.basics.at("title", default: "") != "" { (cv.basics.title,) } else { () },
  location: (
    city: cv.basics.at("city", default: ""),
    region: "",
    country: cv.basics.at("country", default: ""),
    label: compact_location(cv.basics.at("city", default: ""), cv.basics.at("country", default: ""), fallback: cv.basics.at("location", default: "")),
  ),
  profiles: urls_to_profiles(cv.basics.at("urls", default: (:))),
)

#let uservars = (
  headingfont: "Libertinus Serif",
  bodyfont: "Libertinus Serif",
  fontsize: 10pt,
  linespacing: 6pt,
  sectionspacing: 0pt,
  showAddress: true,
  showNumber: true,
  showTitle: true,
  headingsmallcaps: false,
  sendnote: false,
)

#let setrules(uservars, doc) = {
  set text(
    font: uservars.bodyfont,
    size: uservars.fontsize,
    hyphenate: false,
    lang: lang,
  )

  set list(spacing: uservars.linespacing)
  set par(leading: uservars.linespacing, justify: true)
  doc
}

#let showrules(uservars, doc) = {
  show heading.where(level: 2): it => block(width: 100%)[
    #v(uservars.sectionspacing)
    #set align(left)
    #set text(font: uservars.headingfont, size: 1em, weight: "bold")
    #if uservars.at("headingsmallcaps", default: false) { smallcaps(it.body) } else { upper(it.body) }
    #v(-0.75em) #line(length: 100%, stroke: 1pt + black)
  ]

  show heading.where(level: 1): it => block(width: 100%)[
    #set text(font: uservars.headingfont, size: 1.5em, weight: "bold")
    #if uservars.at("headingsmallcaps", default: false) { smallcaps(it.body) } else { upper(it.body) }
    #v(2pt)
  ]

  doc
}

#let cvinit(doc) = {
  doc = setrules(uservars, doc)
  doc = showrules(uservars, doc)
  set page(paper: "a4", margin: 1.25cm)
  doc
}

#let contacttext(info, uservars) = block(width: 100%)[
  #let profiles = (
    if info.personal.email != "" { box(link("mailto:" + info.personal.email, info.personal.email)) },
    if info.personal.phone != "" and uservars.showNumber { box(link("tel:" + info.personal.phone, info.personal.phone)) } else { none },
    if info.personal.url != none { box(link(info.personal.url, display_url(info.personal.url))) } else { none },
  ).filter(it => it != none)

  #if info.personal.profiles.len() > 0 {
    for profile in info.personal.profiles {
      let profile_url = profile.at("url", default: "")
      let profile_label = display_url(profile_url)
      if profile_label != none {
        profiles.push(box(link(profile_url, profile_label)))
      }
    }
  }

  #set text(font: uservars.bodyfont, weight: "medium", size: uservars.fontsize)
  #pad(x: 0em)[#profiles.join([#sym.space.en #sym.diamond.filled #sym.space.en])]
]

#let cvheading(info, uservars) = {
  align(center)[
    = #info.personal.name
    #if info.personal.titles.len() > 0 and uservars.showTitle [
      #block(width: 100%)[*#info.personal.titles.join("  /  ")* #v(-4pt)]
    ]
    #if info.personal.location.label != "" and uservars.showAddress [
      #block(width: 100%)[#info.personal.location.label #v(-4pt)]
    ]
    #contacttext(info, uservars)
  ]
}

#let cvsummary(text) = {
  if text != "" [
    == #labels.summary
    #text
  ]
}

#let cvwork(info, title: labels.work, isbreakable: true) = {
  if info.work.len() > 0 { block[
    == #title
    #for w in info.work {
      block(width: 100%, breakable: isbreakable)[
        *#w.organization* #h(1fr) *#w.location* \
      ]
      let index = 0
      for p in w.positions {
        if index != 0 { v(0.6em) }
        block(width: 100%, breakable: isbreakable, above: 0.6em)[
          #text(style: "italic")[#p.position] #h(1fr)
          #daterange(strpdate(p.startDate, lang: lang), strpdate(p.endDate, lang: lang)) \
          #for hi in p.highlights [
            - #hi
          ]
        ]
        index = index + 1
      }
    }
  ]}
}

#let cveducation(info, title: labels.education, isbreakable: true) = {
  if info.education.len() > 0 { block[
    == #title
    #for edu in info.education {
      let edu_items = ()
      if edu.honors.len() > 0 { edu_items.push([- *#labels.details*: #edu.honors.join(", ")]) }
      if edu.courses.len() > 0 { edu_items.push([- *#labels.coursework*: #edu.courses.join(", ")]) }

      block(width: 100%, breakable: isbreakable)[
        *#edu.institution* #h(1fr) *#edu.location* \
        #if edu.area != "" [
          #text(style: "italic")[#edu.studyType in #edu.area] #h(1fr)
        ] else [
          #text(style: "italic")[#edu.studyType] #h(1fr)
        ]
        #daterange(strpdate(edu.startDate, lang: lang), strpdate(edu.endDate, lang: lang)) \
        #for item in edu_items [
          #item
        ]
      ]
    }
  ]}
}

#let cvprojects(info, title: labels.projects, isbreakable: true) = {
  if info.projects.len() > 0 { block[
    == #title
    #for project in info.projects {
      block(width: 100%, breakable: isbreakable)[
        #if project.url != none [
          *#link(project.url)[#project.name]* \
        ] else [
          *#project.name* \
        ]
        #text(style: "italic")[#project.affiliation] #h(1fr) #daterange(strpdate(project.startDate, lang: lang), strpdate(project.endDate, lang: lang)) \
        #for hi in project.highlights [
          - #hi
        ]
      ]
    }
  ]}
}

#let cvcertificates(info, title: labels.certifications, isbreakable: true) = {
  if info.certificates.len() > 0 { block[
    == #title
    #for cert in info.certificates {
      block(width: 100%, breakable: isbreakable)[
        #if cert.url != none [*#link(cert.url)[#cert.name]* #h(1fr)] else [*#cert.name* #h(1fr)]
        \
        #labels.issuedBy #text(style: "italic")[#cert.issuer] #h(1fr) #strpdate(cert.date, lang: lang) \
        #if cert.details != "" [
          - *#labels.details*: #cert.details
        ]
      ]
    }
  ]}
}

#let cvskills(info, title: labels.skills, isbreakable: true) = {
  if info.languages.len() > 0 or info.skills.len() > 0 { block(breakable: isbreakable)[
    == #title
    #if info.languages.len() > 0 [
      #let langs = ()
      #for lang-item in info.languages { langs.push([#lang-item.language (#lang-item.fluency)]) }
      - *#labels.languages*: #langs.join(", ")
    ]
    #if info.skills.len() > 0 [
      #for group in info.skills [
        - *#group.category*: #group.skills.join(", ")
      ]
    ]
  ]}
}

#let info = (
  personal: personal,
  work: work_items,
  education: education_items,
  projects: project_items,
  certificates: certificate_items,
  skills: cv.at("skills", default: ()).map(group => (category: group.at("category", default: ""), skills: group.at("keywords", default: ()))),
  languages: cv.at("languages", default: ()).map(item => (language: item.at("language", default: ""), fluency: item.at("fluency", default: ""))),
)

#show: doc => cvinit(doc)

#cvheading(info, uservars)
#cvsummary(cv.basics.at("summary", default: ""))
#cvwork(info)
#cveducation(info)
#cvprojects(info)
#cvcertificates(info)
#cvskills(info)
