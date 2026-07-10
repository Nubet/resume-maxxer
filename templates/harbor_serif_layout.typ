#let section-block(title, content) = [
  #grid(
    columns: (4.2cm, 1fr),
    smallcaps(text(font: "Cronos Pro", size: 14.5pt, title)),
    content,
  )
  #v(20pt)
]

#let education-heading(institution: [], location: [], role: [], time: []) = [
  #grid(
    columns: (3fr, 1fr),
    align: (left, right),
    row-gutter: 10pt,
    [#strong(institution) \ #emph(role)],
    [#location \ #time],
  )
]

#let experience-heading(position: [], company: [], location: [], time: []) = [
  #grid(
    columns: (3fr, 1fr),
    align: (left, right),
    row-gutter: 10pt,
    [#strong(position) \ #emph(company)],
    [#location \ #time],
  )
]

#let project-heading(title: [], subtitle: [], time: []) = [
  #grid(
    columns: (3fr, 1fr),
    align: (left, right),
    grid.cell(colspan: 2, strong(title)),
    row-gutter: 8pt,
    emph(subtitle),
    time,
  )
]

#let dated-item(title: [], time: []) = [
  #grid(
    columns: (3fr, 1fr),
    align: (left, right),
    [- #title],
    time,
  )
]
