#import "template_utils.typ": compact_location, display_url, format_date, join_nonempty, safe_url
#import "horizon_sidebar_layout.typ": contact, medium, resume-page, section, small, tags, theme

#let cv = json(sys.inputs.at("data_path", default: "../schemas/example_resume.json"))
#let lang = cv.metadata.at("language", default: "pl")

#let labels = (
  pl: (
    candidate: "Kandydat",
    document: "CV",
    experience: "Doświadczenie zawodowe",
    education: "Wykształcenie",
    skills: "Umiejętności",
    languages: "Języki",
    certifications: "Certyfikaty",
    technologies: "Technologie",
    achievements: "Najważniejsze osiągnięcia",
    details: "Szczegóły",
  ),
  en: (
    candidate: "Candidate",
    document: "Resume",
    experience: "Professional Experience",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    certifications: "Certifications",
    technologies: "Technologies",
    achievements: "Key Achievements",
    details: "Details",
  ),
).at(lang, default: (
  candidate: "Kandydat",
  document: "CV",
  experience: "Doświadczenie zawodowe",
  education: "Wykształcenie",
  skills: "Umiejętności",
  languages: "Języki",
  certifications: "Certyfikaty",
  technologies: "Technologie",
  achievements: "Najważniejsze osiągnięcia",
  details: "Szczegóły",
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

#let experience_score(exp) = {
  let intro_score = if exp.at("responsibilities", default: ()).len() > 0 { 2 } else { 0 }
  let points_score = if exp.at("highlights", default: ()).len() > 0 {
    exp.highlights.len() * 2
  } else {
    calc.max(exp.at("responsibilities", default: ()).len() - 1, 0) * 2
  }
  6 + intro_score + points_score
}

#let skill_score(skill) = {
  let keywords_len = skill.at("keywords", default: ()).len()
  if keywords_len <= 6 {
    2
  } else if keywords_len <= 12 {
    3
  } else {
    4
  }
}

#let take_by_budget(items, item_score, budget) = {
  let taken = ()
  let used = 0

  if budget <= 0 {
    return (
      taken: (),
      rest: items,
      used: 0,
    )
  }

  for index in range(items.len()) {
    let item = items.at(index)
    let score = item_score(item)
    if index == taken.len() and used + score <= budget {
      taken.push(item)
      used += score
    }
  }

  (
    taken: taken,
    rest: items.slice(taken.len()),
    used: used,
  )
}

#let paginate_by_budget(items, item_score, budget) = {
  if items.len() == 0 {
    ()
  } else {
    let split = take_by_budget(items, item_score, budget)
    (split.taken, ..paginate_by_budget(split.rest, item_score, budget))
  }
}

#let build_page(experience_items, skill_items, budget) = {
  let experience_split = take_by_budget(experience_items, experience_score, budget)
  let budget_after_experience = if experience_split.rest.len() > 0 {
    0
  } else {
    budget - experience_split.used
  }

  let skill_split = take_by_budget(skill_items, skill_score, budget_after_experience)

  (
    experience: experience_split.taken,
    skills: skill_split.taken,
    rest_experience: experience_split.rest,
    rest_skills: skill_split.rest,
  )
}

#let paginate_sections(experience_items, skill_items, budget) = {
  if experience_items.len() == 0 and skill_items.len() == 0 {
    ()
  } else {
    let page = build_page(experience_items, skill_items, budget)
    (page, ..paginate_sections(page.rest_experience, page.rest_skills, budget))
  }
}

#let render_sidebar() = [
  = #cv.basics.at("name", default: labels.candidate)

  #let sidebar_title = if cv.basics.at("targetRole", default: "") != "" {
    cv.basics.targetRole
  } else {
    cv.basics.at("title", default: "")
  }
  #if sidebar_title != "" [
    #medium(sidebar_title)
    #v(4pt)
  ]

  #if cv.basics.at("showSummary", default: true) and cv.basics.at("summary", default: "") != "" [
    #cv.basics.summary
    #v(6pt)
  ]

  #contact(
    phone: cv.basics.at("phone", default: ""),
    linkedin: linkedin_value,
    github: github_value,
    email: cv.basics.at("email", default: ""),
    location: compact_location(cv.basics.at("city", default: ""), cv.basics.at("country", default: ""), fallback: cv.basics.at("location", default: ""), show_country: cv.basics.at("showCountry", default: true)),
    website: website_value,
  )

  #if cv.at("education", default: ()).len() > 0 [
    #v(4pt)
    #section(icon: "university", labels.education)[
      #small()[
        #for edu in cv.education [
          #let degree_line = join_nonempty((edu.at("degree", default: ""), edu.at("field", default: "")), separator: ", ")
          *#degree_line* \
          #edu.at("institution", default: "") (#join_nonempty((format_date(edu.at("startDate", default: none), lang: lang), format_date(edu.at("endDate", default: none), lang: lang)), separator: " - "))
          #if edu.at("gpa", default: "") != "" [\
            GPA: #edu.gpa
          ]
          #if edu != cv.education.last() [
            #v(6pt)
          ]
        ]
      ]
    ]
  ]

  #if cv.at("languages", default: ()).len() > 0 [
    #section(icon: "language", labels.languages)[
      #small()[
        #for item in cv.languages [
          #let language_label = if item.at("fluency", default: "") != "" {
            item.language + " - " + item.fluency
          } else {
            item.language
          }
          #language_label
          #if item != cv.languages.last() [
            #v(4pt)
          ]
        ]
      ]
    ]
  ]

  #if cv.at("certifications", default: ()).len() > 0 [
    #section(icon: "certificate", labels.certifications)[
      #small()[
        #for cert in cv.certifications [
          *#cert.at("name", default: "")* \
          #join_nonempty((cert.at("issuer", default: ""), format_date(cert.at("date", default: none), lang: lang)), separator: " - ")
          #if cert != cv.certifications.last() [
            #v(6pt)
          ]
        ]
      ]
    ]
  ]
]

#let render_experience(items) = {
  if items.len() > 0 [
    #section(icon: "briefcase", labels.experience)[
      #set par(leading: 0.92em)
      #for index in range(items.len()) [
        #let exp = items.at(index)
        #if index > 0 [
          #v(2pt)
          #line(length: 100%, stroke: 0.5pt + rgb("D7D1CE"))
          #v(4pt)
        ]

        #text(size: 11pt, weight: "bold", fill: rgb("2F5752"))[#exp.at("position", default: "")]
        #v(2pt)
        #text(size: 9.5pt)[#join_nonempty((exp.at("company", default: ""), join_nonempty((format_date(exp.at("startDate", default: none), lang: lang), format_date(exp.at("endDate", default: none), lang: lang)), separator: " - "), exp.at("location", default: "")), separator: " | ")]
        #v(2pt)

        #let intro = if exp.at("responsibilities", default: ()).len() > 0 { exp.responsibilities.at(0, default: "") } else { "" }
        #if intro != "" [
          #intro
        ]

        #let points = if exp.at("highlights", default: ()).len() > 0 { exp.highlights } else if exp.at("responsibilities", default: ()).len() > 1 { exp.responsibilities.slice(1) } else { () }
        #if points.len() > 0 [
          #strong(labels.achievements + ":")
          #for point in points [
            - #point
          ]
        ]

        #v(5pt)
      ]
    ]
  ]
}

#let render_skills(items) = {
  if items.len() > 0 [
    #section(icon: "check-double", labels.skills)[
      #for skill in items [
        #if skill.at("keywords", default: ()).len() > 0 [
          #text(weight: "bold")[#skill.at("category", default: labels.skills)]
          #v(2pt)
          #tags(..skill.keywords)
          #v(6pt)
        ]
      ]
    ]
  ]
}

#let first_page_budget = 40
#let next_page_budget = 40

#let first_page = build_page(
  cv.at("experience", default: ()),
  cv.at("skills", default: ()),
  first_page_budget,
)

#let next_pages = paginate_sections(
  first_page.rest_experience,
  first_page.rest_skills,
  next_page_budget,
)

#theme(
  accent-color: rgb("61B7AE"),
  background-color: rgb("F2F0EF"),
)

#resume-page(sidebar: render_sidebar())[
  #render_experience(first_page.experience)
  #render_skills(first_page.skills)
]

#for index in range(next_pages.len()) [
  #pagebreak()
  #resume-page()[
    #let page = next_pages.at(index)
    #render_experience(page.experience)
    #render_skills(page.skills)
  ]
]
