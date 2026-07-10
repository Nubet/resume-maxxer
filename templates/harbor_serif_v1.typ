#import "template_utils.typ": compact_location, display_url, format_date, join_nonempty, safe_url
#import "harbor_serif_layout.typ": dated-item, education-heading, experience-heading, project-heading, section-block

#let cv = json(sys.inputs.at("data_path", default: "../schemas/example_resume.json"))
#let lang = cv.metadata.at("language", default: "pl")

#let labels = (
  pl: (
    candidate: "Kandydat",
    document: "CV",
    profile: "Profil",
    education: "Wykształcenie",
    experience: "Doświadczenie",
    projects: "Projekty",
    certifications: "Certyfikaty",
    skills: "Umiejętności",
    languages: "Języki",
    skills_label: "Kompetencje",
    links: "Linki",
  ),
  en: (
    candidate: "Candidate",
    document: "Resume",
    profile: "Profile",
    education: "Education",
    experience: "Experience",
    projects: "Projects",
    certifications: "Certifications",
    skills: "Skills",
    languages: "Languages",
    skills_label: "Capabilities",
    links: "Links",
  ),
).at(lang, default: (
  candidate: "Kandydat",
  document: "CV",
  profile: "Profil",
  education: "Wykształcenie",
  experience: "Doświadczenie",
  projects: "Projekty",
  certifications: "Certyfikaty",
  skills: "Umiejętności",
  languages: "Języki",
  skills_label: "Kompetencje",
  links: "Linki",
))

#set document(
  author: cv.basics.at("name", default: labels.candidate),
  title: labels.document + " | " + cv.basics.at("name", default: labels.candidate),
)

#set page(margin: (top: 1.2cm, bottom: 2.6cm, left: 1.8cm, right: 2.3cm))
#set text(font: "Sabon LT Std", 10pt)

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

#let link_value(raw) = {
  let normalized = safe_url(raw)
  if normalized == none { none } else { display_url(normalized) }
}

#let compact_link_text(raw) = {
  let normalized = link_value(raw)
  if normalized == none {
    none
  } else if normalized.starts-with("linkedin.com/in/") {
    "linkedin/" + normalized.slice("linkedin.com/in/".len())
  } else if normalized.starts-with("github.com/") {
    "github/" + normalized.slice("github.com/".len())
  } else if normalized.len() > 28 {
    normalized.slice(0, 25) + "..."
  } else {
    normalized
  }
}

#let contact_lines = {
  let lines = ()
  if cv.basics.at("phone", default: "") != "" { lines.push(cv.basics.phone) }
  if cv.basics.at("email", default: "") != "" { lines.push(cv.basics.email) }
  let location_line = compact_location(cv.basics.at("city", default: ""), cv.basics.at("country", default: ""), fallback: cv.basics.at("location", default: ""))
  if location_line != "" { lines.push(location_line) }
  let website = compact_link_text(cv.basics.at("urls", default: (:)).at("website", default: cv.basics.at("urls", default: (:)).at("portfolio", default: "")))
  if website != none { lines.push(website) }
  let linkedin = profile_id(cv.basics.at("urls", default: (:)).at("linkedin", default: ""), "linkedin.com/in/")
  if linkedin != "" { lines.push("linkedin/" + linkedin) }
  let github = profile_id(cv.basics.at("urls", default: (:)).at("github", default: ""), "github.com/")
  if github != "" { lines.push("github/" + github) }
  lines
}

#let render_points(points) = {
  for point in points {
    if str(point).trim() != "" {
      [- #point]
    }
  }
}

#grid(
  columns: (1fr, 6.2cm),
  align: (left + bottom, right + bottom),
  smallcaps[
    #text(font: "Calluna", size: 30pt)[#cv.basics.at("name", default: labels.candidate)]
    #let headline = if cv.basics.at("targetRole", default: "") != "" {
      cv.basics.targetRole
    } else {
      cv.basics.at("title", default: "")
    }
    #if headline != "" [
      #linebreak()
      #text(font: "Calluna", size: 13.2pt)[#headline]
    ]
  ],
  [
    #set text(size: 8.7pt)
    #for line_item in contact_lines [
      #line_item\
    ]
  ],
)

#line(length: 100%, stroke: 0.4pt)

#if cv.basics.at("summary", default: "") != "" [
  #section-block(
    [#labels.profile],
    [
      #set par(justify: true)
      #cv.basics.summary
    ],
  )
]

#if cv.at("experience", default: ()).len() > 0 [
  #section-block(
    [#labels.experience],
    [
      #for exp in cv.experience [
        #experience-heading(
          position: [#exp.at("position", default: "")],
          company: [#exp.at("company", default: "")],
          location: [#exp.at("location", default: "")],
          time: [#join_nonempty((format_date(exp.at("startDate", default: none), lang: lang), format_date(exp.at("endDate", default: none), lang: lang)), separator: " - ")],
        )
        #let points = if exp.at("highlights", default: ()).len() > 0 {
          exp.highlights
        } else {
          exp.at("responsibilities", default: ())
        }
        #render_points(points)
        #if exp != cv.experience.last() [#v(14pt)]
      ]
    ],
  )
]

#if cv.at("projects", default: ()).len() > 0 [
  #section-block(
    [#labels.projects],
    [
      #for project in cv.projects [
        #project-heading(
          title: [#project.at("name", default: "")],
          subtitle: [#join_nonempty((project.at("role", default: ""), project.at("organization", default: "")), separator: " | ")],
          time: [#join_nonempty((format_date(project.at("startDate", default: none), lang: lang), format_date(project.at("endDate", default: none), lang: lang)), separator: " - ")],
        )
        #let project_points = ()
        #if project.at("description", default: "") != "" { project_points.push(project.description) }
        #for point in project.at("highlights", default: ()) {
          if str(point).trim() != "" { project_points.push(point) }
        }
        #if project.at("keywords", default: ()).len() > 0 {
          project_points.push(join_nonempty((labels.skills_label, project.keywords.join(", ")), separator: ": "))
        }
        #render_points(project_points)
        #if project != cv.projects.last() [#v(14pt)]
      ]
    ],
  )
]

#if cv.at("education", default: ()).len() > 0 [
  #section-block(
    [#labels.education],
    [
      #for edu in cv.education [
        #education-heading(
          institution: [#edu.at("institution", default: "")],
          location: [#edu.at("location", default: "")],
          role: [#join_nonempty((edu.at("degree", default: ""), edu.at("field", default: "")), separator: if lang == "pl" { ", " } else { " in " })],
          time: [#join_nonempty((format_date(edu.at("startDate", default: none), lang: lang), format_date(edu.at("endDate", default: none), lang: lang)), separator: " - ")],
        )
        #let edu_points = ()
        #if edu.at("gpa", default: "") != "" { edu_points.push("GPA: " + edu.gpa) }
        #for course in edu.at("coursework", default: ()) {
          if str(course).trim() != "" { edu_points.push(course) }
        }
        #render_points(edu_points)
        #if edu != cv.education.last() [#v(14pt)]
      ]
    ],
  )
]

#if cv.at("certifications", default: ()).len() > 0 [
  #section-block(
    [#labels.certifications],
    [
      #set par(spacing: 8pt)
      #for cert in cv.certifications [
        #dated-item(
          title: [*#cert.at("name", default: "")*#if cert.at("issuer", default: "") != "" [, #cert.issuer]#if cert.at("details", default: "") != "" [, #cert.details]],
          time: [#join_nonempty((format_date(cert.at("date", default: none), lang: lang), cert.at("expires", default: "")), separator: " | ")],
        )
      ]
    ],
  )
]

#if cv.at("skills", default: ()).len() > 0 [
  #section-block(
    [#labels.skills],
    [
      #set terms(separator: [: ])
      #for skill in cv.skills [
        #if skill.at("keywords", default: ()).len() > 0 [
          / #skill.at("category", default: labels.skills): #skill.keywords.join(", ")
        ]
      ]
    ],
  )
]

#if cv.at("languages", default: ()).len() > 0 [
  #section-block(
    [#labels.languages],
    [
      #set terms(separator: [: ])
      #for item in cv.languages [
        #let details = ()
        #if item.at("fluency", default: "") != "" { details.push(item.fluency) }
        #if item.at("certificate", default: "") != "" { details.push(item.certificate) }
        / #item.at("language", default: ""): #details.join(" | ")
      ]
    ],
  )
]
