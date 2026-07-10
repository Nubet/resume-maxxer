#import "template_utils.typ": compact_location, display_url, format_date, join_nonempty, safe_url
#import "vector_compact_layout.typ": custom-title, education-heading, project-heading, resume, skills, work-heading

#let cv = json(sys.inputs.at("data_path", default: "../schemas/example_resume.json"))
#let lang = cv.metadata.at("language", default: "pl")

#let labels = (
  pl: (
    candidate: "Kandydat",
    document: "CV",
    summary: "Podsumowanie zawodowe",
    education: "Wykształcenie",
    experience: "Doświadczenie zawodowe",
    projects: "Projekty",
    skills: "Umiejętności",
    languages: "Języki",
    certifications: "Certyfikaty",
    technologies: "Technologie",
    coursework: "Kursy",
    gpa: "Średnia",
    present: "Obecnie",
    details: "Szczegóły",
    validity: "Ważność",
  ),
  en: (
    candidate: "Candidate",
    document: "Resume",
    summary: "Professional Summary",
    education: "Education",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    languages: "Languages",
    certifications: "Certifications",
    technologies: "Technologies",
    coursework: "Coursework",
    gpa: "GPA",
    present: "Present",
    details: "Details",
    validity: "Validity",
  ),
).at(lang, default: (
  candidate: "Kandydat",
  document: "CV",
  summary: "Podsumowanie zawodowe",
  education: "Wykształcenie",
  experience: "Doświadczenie zawodowe",
  projects: "Projekty",
  skills: "Umiejętności",
  languages: "Języki",
  certifications: "Certyfikaty",
  technologies: "Technologie",
  coursework: "Kursy",
  gpa: "Średnia",
  present: "Obecnie",
  details: "Szczegóły",
  validity: "Ważność",
))

#set document(
  author: cv.basics.at("name", default: labels.candidate),
  title: labels.document + " | " + cv.basics.at("name", default: labels.candidate),
)

#let profile_id(value, prefix) = {
  let normalized = display_url(value)
  if normalized == none {
    ""
  } else if normalized.starts-with(prefix) {
    normalized.slice(prefix.len())
  } else if normalized.starts-with("www." + prefix) {
    normalized.slice(("www." + prefix).len())
  } else {
    normalized
  }
}

#let website_value = {
  let urls = cv.basics.at("urls", default: (:))
  let website = safe_url(urls.at("website", default: urls.at("portfolio", default: "")))
  if website == none { "" } else { display_url(website) }
}

#let linkedin_value = profile_id(cv.basics.at("urls", default: (:)).at("linkedin", default: ""), "linkedin.com/in/")
#let github_value = profile_id(cv.basics.at("urls", default: (:)).at("github", default: ""), "github.com/")

#show: resume.with(
  top-margin: 0.45in,
  personal-info-font-size: 9.2pt,
  author-position: center,
  personal-info-position: center,
  author-name: cv.basics.at("name", default: labels.candidate),
  phone: cv.basics.at("phone", default: ""),
  location: compact_location(cv.basics.at("city", default: ""), cv.basics.at("country", default: ""), fallback: cv.basics.at("location", default: "")),
  email: cv.basics.at("email", default: ""),
  website: website_value,
  linkedin-user-id: linkedin_value,
  github-username: github_value,
  lang: lang,
  document-title-prefix: labels.document,
)

#if cv.at("education", default: ()).len() > 0 [
  #custom-title(labels.education)[
    #for edu in cv.education [
      #let degree_line = edu.at("degree", default: "")
      #let major_line = edu.at("field", default: "")
      #let details = ()
      #if edu.at("gpa", default: "") != "" { details.push(labels.gpa + ": " + edu.gpa) }
      #if edu.at("coursework", default: ()).len() > 0 { details.push(labels.coursework + ": " + edu.coursework.join(", ")) }
      #education-heading(
        edu.at("institution", default: ""),
        edu.at("location", default: ""),
        degree_line,
        major_line,
        edu.at("startDate", default: none),
        edu.at("endDate", default: none),
        lang: lang,
      )[
        #for detail in details [
          - #detail
        ]
      ]
    ]
  ]
]

#if cv.at("experience", default: ()).len() > 0 [
  #custom-title(labels.experience)[
    #for exp in cv.experience [
      #let points = if exp.at("highlights", default: ()).len() > 0 { exp.highlights } else { exp.at("responsibilities", default: ()) }
      #work-heading(
        exp.at("position", default: ""),
        exp.at("company", default: ""),
        exp.at("location", default: ""),
        exp.at("startDate", default: none),
        exp.at("endDate", default: none),
        lang: lang,
      )[
        #for point in points [
          - #point
        ]
      ]
    ]
  ]
]

#if cv.at("projects", default: ()).len() > 0 [
  #custom-title(labels.projects)[
    #for project in cv.projects [
      #let stack_line = if project.at("keywords", default: ()).len() > 0 { project.keywords.join(", ") } else { "" }
      #let details = ()
      #if project.at("description", default: "") != "" { details.push(project.description) }
      #for point in project.at("highlights", default: ()) {
        if point != "" { details.push(point) }
      }
      #let role_line = join_nonempty((project.at("role", default: ""), project.at("organization", default: "")), separator: " / ")
      #let period_line = join_nonempty((format_date(project.at("startDate", default: none), lang: lang), format_date(project.at("endDate", default: none), lang: lang)), separator: " - ")
      #project-heading(
        project.at("name", default: ""),
        stack: stack_line,
        project-url: if safe_url(project.at("url", default: "")) == none { "" } else { safe_url(project.url) },
      )[
        #if role_line != "" [
          - #role_line
        ]
        #if period_line != "" [
          - #period_line
        ]
        #for detail in details [
          - #detail
        ]
      ]
    ]
  ]
]

#if cv.at("skills", default: ()).len() > 0 [
  #custom-title(labels.skills)[
    #skills()[
      #for skill in cv.skills [
        #if skill.at("keywords", default: ()).len() > 0 [
          - *#skill.at("category", default: labels.skills):* #skill.keywords.join(", ")
        ]
      ]
    ]
  ]
]

#if cv.at("languages", default: ()).len() > 0 [
  #custom-title(labels.languages)[
    #skills()[
      #for item in cv.languages [
        #let details = ()
        #if item.at("fluency", default: "") != "" { details.push(item.fluency) }
        #if item.at("certificate", default: "") != "" { details.push(item.certificate) }
        #if item.at("language", default: "") != "" [
          - *#item.language:* #details.join(" | ")
        ]
      ]
    ]
  ]
]

#if cv.at("certifications", default: ()).len() > 0 [
  #custom-title(labels.certifications)[
    #skills()[
      #for cert in cv.certifications [
        #let parts = ()
        #if cert.at("issuer", default: "") != "" { parts.push(cert.issuer) }
        #if cert.at("date", default: "") != "" { parts.push(format_date(cert.date, lang: lang)) }
        #if cert.at("expires", default: "") != "" { parts.push(labels.validity + ": " + cert.expires) }
        #if cert.at("details", default: "") != "" { parts.push(cert.details) }
        #if cert.at("url", default: "") != "" {
          let normalized = safe_url(cert.url)
          if normalized != none { parts.push(display_url(normalized)) }
        }
        - *#cert.at("name", default: "")*: #parts.join(" | ")
      ]
    ]
  ]
]
