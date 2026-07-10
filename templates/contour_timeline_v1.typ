#import "template_utils.typ": *

#import "contour_timeline_layouts/header.typ": layout-header
#import "contour_timeline_layouts/bullet-list.typ": layout-bullet-list
#import "contour_timeline_layouts/numbered-list.typ": layout-numbered-list
#import "contour_timeline_layouts/prose.typ": layout-prose
#import "contour_timeline_layouts/timeline.typ": layout-timeline

#let cv = json(sys.inputs.at("data_path", default: "../schemas/example_resume.json"))
#let lang = cv.metadata.at("language", default: "pl")

#let labels = (
  pl: (
    candidate: "Kandydat",
    document: "CV - ",
    summary: "Podsumowanie zawodowe",
    experience: "Doświadczenie zawodowe",
    education: "Wykształcenie",
    projects: "Projekty",
    skills: "Umiejętności",
    languages: "Języki",
    certifications: "Certyfikaty",
    role: "Rola",
    technologies: "Technologie",
    credential: "Link do certyfikatu",
    expires: "Ważność",
  ),
  en: (
    candidate: "Candidate",
    document: "Resume - ",
    summary: "Professional Summary",
    experience: "Professional Experience",
    education: "Education",
    projects: "Projects",
    skills: "Skills",
    languages: "Languages",
    certifications: "Licenses and Certifications",
    role: "Role",
    technologies: "Technologies",
    credential: "Credential Link",
    expires: "Validity",
  ),
).at(lang, default: (
  candidate: "Kandydat",
  document: "CV - ",
  summary: "Podsumowanie zawodowe",
  experience: "Doświadczenie zawodowe",
  education: "Wykształcenie",
  projects: "Projekty",
  skills: "Umiejętności",
  languages: "Języki",
  certifications: "Certyfikaty",
  role: "Rola",
  technologies: "Technologie",
  credential: "Link do certyfikatu",
  expires: "Ważność",
))

#set document(
  author: cv.basics.at("name", default: labels.candidate),
  title: labels.document + cv.basics.at("name", default: labels.candidate),
)

#let settings = (
  font-heading: "Libertinus Serif",
  font-body: "Libertinus Serif",
  fontsize: 10pt,
  spacing-section: 12pt,
  spacing-entry: 0.1em,
  spacing-element: 3pt,
  spacing-line: 5pt,
  color-hyperlink: rgb(50, 120, 180),
  page: (
    paper: "a4",
    numbering: "1 / 1",
    number-align: "center",
    margin: 3.5cm,
  ),
)

#let title_list = {
  let items = ()
  let title = cv.basics.at("title", default: "")
  let target_role = cv.basics.at("targetRole", default: "")
  if title != "" {
    items.push(title)
  }
  if target_role != "" and target_role != title {
    items.push(target_role)
  }
  items
}

#let website_url = {
  let urls = cv.basics.at("urls", default: (:))
  safe_url(urls.at("website", default: urls.at("portfolio", default: "")))
}

#let profile_list = {
  let urls = cv.basics.at("urls", default: (:))
  let profiles = ()

  for (network, value) in urls.pairs() {
    let normalized = safe_url(value)
    if normalized != none and normalized != website_url {
      profiles.push((
        network: network,
        username: display_url(normalized),
        url: normalized,
      ))
    }
  }

  profiles
}

#let personal = (
  name: cv.basics.at("name", default: ""),
  titles: title_list,
  location: (
    city: cv.basics.at("city", default: ""),
    country: cv.basics.at("country", default: ""),
    label: compact_location(cv.basics.at("city", default: ""), cv.basics.at("country", default: ""), fallback: cv.basics.at("location", default: "")),
  ),
  contact: (
    email: if cv.basics.at("email", default: "") != "" { cv.basics.email } else { none },
    phone: if cv.basics.at("phone", default: "") != "" { cv.basics.phone } else { none },
    website: website_url,
  ),
  profiles: profile_list,
)

#let header_sections = {
  let section = (layout: "header")
  section.insert("show", true)
  section.insert("include", ("titles", "location", "contact"))
  (section,)
}

#let summary_entries = {
  let summary = cv.basics.at("summary", default: "")
  if summary == "" { () } else { (summary,) }
}

#let experience_entries = {
  let items = ()
  for exp in cv.at("experience", default: ()) {
    let entry = (
      institution: exp.at("company", default: ""),
      title: exp.at("position", default: ""),
    )

    if exp.at("location", default: "") != "" {
      entry.insert("location", exp.location)
    }

    let details = ()
    for item in exp.at("highlights", default: ()) {
      if item != "" { details.push(item) }
    }
    if details.len() == 0 {
      for item in exp.at("responsibilities", default: ()) {
        if item != "" { details.push(item) }
      }
    }
    if details.len() > 0 {
      entry.insert("description", details.join("; "))
    }

    entry.insert("start-date", format_date(exp.at("startDate", default: none), lang: lang))
    entry.insert("end-date", format_date(exp.at("endDate", default: none), lang: lang))
    items.push(entry)
  }
  items
}

#let education_entries = {
  let items = ()
  for edu in cv.at("education", default: ()) {
    let title = join_nonempty((edu.at("degree", default: ""), edu.at("field", default: "")), separator: " in ")
    let details = ()
    if edu.at("gpa", default: "") != "" { details.push(edu.gpa) }
    if edu.at("coursework", default: ()).len() > 0 { details.push(edu.coursework.join(", ")) }

    let entry = (
      institution: edu.at("institution", default: ""),
      title: if title != "" { title } else { none },
    )
    if edu.at("location", default: "") != "" {
      entry.insert("location", edu.location)
    }
    if details.len() > 0 {
      entry.insert("description", details.join(" | "))
    }
    entry.insert("start-date", format_date(edu.at("startDate", default: none), lang: lang))
    entry.insert("end-date", format_date(edu.at("endDate", default: none), lang: lang))
    items.push(entry)
  }
  items
}

#let project_entries = {
  let items = ()
  for project in cv.at("projects", default: ()) {
    let org_line = join_nonempty((project.at("role", default: ""), project.at("organization", default: "")), separator: " / ")
    let details = ()
    if project.at("description", default: "") != "" { details.push(project.description) }
    for item in project.at("highlights", default: ()) {
      if item != "" { details.push(item) }
    }
    if project.at("keywords", default: ()).len() > 0 {
      details.push(labels.technologies + ": " + project.keywords.join(", "))
    }
    if project.at("url", default: "") != "" {
      let normalized = safe_url(project.url)
      if normalized != none {
        details.push(display_url(normalized))
      }
    }

    let entry = (
      title: project.at("name", default: ""),
      institution: if org_line != "" { org_line } else { none },
    )
    if details.len() > 0 {
      entry.insert("description", details.join("; "))
    }
    entry.insert("start-date", format_date(project.at("startDate", default: none), lang: lang))
    entry.insert("end-date", format_date(project.at("endDate", default: none), lang: lang))
    items.push(entry)
  }
  items
}

#let skill_entries = {
  let items = ()
  for skill in cv.at("skills", default: ()) {
    let category = skill.at("category", default: "")
    let keywords = skill.at("keywords", default: ())
    if keywords.len() > 0 {
      if category != "" {
        items.push("*" + category + ":* " + keywords.join(", "))
      } else {
        items.push(keywords.join(", "))
      }
    }
  }
  items
}

#let language_entries = {
  let items = ()
  for item in cv.at("languages", default: ()) {
    let details = ()
    if item.at("fluency", default: "") != "" { details.push(item.fluency) }
    if item.at("certificate", default: "") != "" { details.push(item.certificate) }
    let suffix = details.join(" | ")
    if item.at("language", default: "") != "" {
      if suffix != "" {
        items.push("*" + item.language + ":* " + suffix)
      } else {
        items.push(item.language)
      }
    }
  }
  items
}

#let certification_entries = {
  let items = ()
  for cert in cv.at("certifications", default: ()) {
    let details = ()
    if cert.at("details", default: "") != "" { details.push(cert.details) }
    if cert.at("expires", default: "") != "" and cert.expires != "bezterminowo" {
      details.push(labels.expires + ": " + format_date(cert.expires, lang: lang))
    }
    let cert_url = safe_url(cert.at("url", default: ""))
    if cert_url != none {
      details.push(labels.credential + ": " + display_url(cert_url))
    }

    let entry = (
      title: cert.at("name", default: ""),
      institution: if cert.at("issuer", default: "") != "" { cert.issuer } else { none },
    )
    if details.len() > 0 {
      entry.insert("description", details.join("; "))
    }
    entry.insert("start-date", format_date(cert.at("date", default: none), lang: lang))
    items.push(entry)
  }
  items
}

#let setrules(settings, doc) = {
  set text(
    font: settings.font-body,
    size: settings.fontsize,
    hyphenate: false,
    lang: lang,
  )

  set list(
    spacing: settings.spacing-line,
  )

  set par(
    leading: settings.spacing-line,
    justify: true,
  )

  show link: it => {
    text(
      fill: settings.color-hyperlink,
    )[#it]
  }

  doc
}

#let showrules(settings, doc) = {
  show heading.where(level: 2): it => block(width: 100%)[
    #v(settings.spacing-section)
    #set align(left)
    #set text(font: settings.font-heading, size: 1em, weight: "semibold")
    #it.body
    #v(-0.75em) #line(length: 100%, stroke: 1pt + black)
  ]

  show heading.where(level: 1): it => block(width: 100%)[
    #set text(font: settings.font-heading, size: 1.1em, weight: "semibold")
    #it.body
    #v(2pt)
  ]

  doc
}

#let customrules(doc) = {
  set page(
    paper: settings.page.paper,
    numbering: settings.page.numbering,
    number-align: center,
    margin: settings.page.margin,
  )
  doc
}

#let cvinit(doc) = {
  doc = setrules(settings, doc)
  doc = showrules(settings, doc)
  doc = customrules(doc)
  doc
}

#show: doc => cvinit(doc)

#let header_data = (
  personal: personal,
  sections: header_sections,
)

#layout-header(header_data, settings)

#if summary_entries.len() > 0 [
  == #labels.summary
  #layout-prose(summary_entries)
]

#if experience_entries.len() > 0 [
  == #labels.experience
  #layout-timeline(experience_entries, primary-element: ("institution",), secondary-element: ("title",), tertiary-element: ("description",), settings: settings)
]

#if education_entries.len() > 0 [
  == #labels.education
  #layout-timeline(education_entries, primary-element: ("institution",), secondary-element: ("title",), tertiary-element: ("description",), settings: settings)
]

#if project_entries.len() > 0 [
  == #labels.projects
  #layout-timeline(project_entries, primary-element: ("title", "institution"), secondary-element: (), tertiary-element: ("description",), settings: settings)
]

#if skill_entries.len() > 0 [
  == #labels.skills
  #layout-bullet-list(skill_entries)
]

#if language_entries.len() > 0 [
  == #labels.languages
  #layout-bullet-list(language_entries)
]

#if certification_entries.len() > 0 [
  == #labels.certifications
  #layout-timeline(certification_entries, primary-element: ("title", "institution"), secondary-element: (), tertiary-element: ("description",), settings: settings)
]
