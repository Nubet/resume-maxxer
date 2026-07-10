#let layout-timeline(data, primary-element: none, secondary-element: none, tertiary-element: none, settings: none, isbreakable: true) = {
  let year_column_width = 7em
  let spacing_entry = settings.at("spacing-entry", default: 0.5em)
  let spacing_element = -1em + settings.at("spacing-element", default: 2pt)
  let primary = if type(primary-element) == array { primary-element } else { (primary-element,) }
  let secondary = if type(secondary-element) == array { secondary-element } else { (secondary-element,) }
  let tertiary = if type(tertiary-element) == array { tertiary-element } else { (tertiary-element,) }
  let mentor_types = (
    (key: "advisors", singular: "Advisor", plural: "Advisors"),
    (key: "professors", singular: "Professor", plural: "Professors"),
    (key: "supervisors", singular: "Supervisor", plural: "Supervisors"),
  )

  let is-mentor-type(field) = {
    for type in mentor_types {
      if field == type.key {
        return true
      }
    }
    return false
  }

  let format-mentors(entry, key) = {
    let mentor_type = mentor_types.find(t => t.key == key)
    if mentor_type == none { return none }

    let mentors = entry.at(key, default: none)
    if mentors == none or mentors.len() == 0 { return none }

    let label = if mentors.len() == 1 { mentor_type.singular + ":" } else { mentor_type.plural + ":" }

    let names = if mentors.len() == 1 {
      mentors.at(0)
    } else if mentors.len() == 2 {
      [#mentors.at(0) and #mentors.at(1)]
    } else {
      let result = []
      for (i, mentor) in mentors.enumerate() {
        if i == mentors.len() - 1 {
          result = result + [and #mentor]
        } else if i == mentors.len() - 2 {
          result = result + [#mentor ]
        } else {
          result = result + [#mentor, ]
        }
      }
      result
    }

    [#text(style: "italic")[#label] #names]
  }

  block(width: 100%, breakable: isbreakable, inset: 0pt, outset: 0pt)[
    #for (i, entry) in data.enumerate() {
      let start_date = entry.at("start-date", default: none)
      let end_date = entry.at("end-date", default: none)
      let year_text = if end_date != none {
        if start_date != none {
          if end_date == "present" or end_date == "Present" or end_date == "Obecnie" {
            [#start_date - #end_date]
          } else if start_date == end_date {
            [#start_date]
          } else {
            [#start_date - #end_date]
          }
        } else {
          [#end_date]
        }
      } else if start_date != none {
        [#start_date]
      } else {
        []
      }

      grid(
        columns: (year_column_width, 1fr),
        gutter: 1em,
        align(right)[#year_text],
        grid.vline(),
        pad(left: 0.5em)[
          #let first_primary_found = false
          #let first_primary_field = none
          #let first_primary_content = none

          #for field in primary {
            if field in entry and entry.at(field) != none and not first_primary_found {
              first_primary_field = field
              first_primary_content = entry.at(field)
              first_primary_found = true
              break
            }
          }

          #if first_primary_found {
            text(weight: "bold")[#first_primary_content]

            if first_primary_field == "institution" and "location" in entry and entry.location != none {
              [, #entry.location]
            }

            let additional_primary = ()
            for field in primary {
              if field != first_primary_field and field in entry and entry.at(field) != none {
                additional_primary.push(entry.at(field))
              }
            }

            if additional_primary.len() > 0 {
              [, #additional_primary.join(", ")]
            }
          }

          #let secondary_content = ()

          #for field in secondary {
            if not is-mentor-type(field) and field in entry and entry.at(field) != none {
              secondary_content.push(entry.at(field))
            }
          }

          #for field in secondary {
            if is-mentor-type(field) {
              let mentor_text = format-mentors(entry, field)
              if mentor_text != none {
                secondary_content.push(mentor_text)
              }
            }
          }

          #for type in mentor_types {
            if type.key not in secondary and type.key in entry and entry.at(type.key) != none {
              let mentor_text = format-mentors(entry, type.key)
              if mentor_text != none {
                secondary_content.push(mentor_text)
              }
            }
          }

          #if secondary_content.len() > 0 and first_primary_found {
            v(spacing_element)

            let regular_secondary = ()
            let special_secondary = ()

            for item in secondary_content {
              if type(item) == str {
                regular_secondary.push(item)
              } else {
                special_secondary.push(item)
              }
            }

            if regular_secondary.len() > 0 {
              text(style: "italic")[#regular_secondary.join(", ")]
            }

            if special_secondary.len() > 0 {
              if regular_secondary.len() > 0 { [, ] }
              special_secondary.join(", ")
            }
          }

          #let tertiary_content = ()
          #for field in tertiary {
            if field in entry and entry.at(field) != none {
              tertiary_content.push(entry.at(field))
            }
          }

          #if tertiary_content.len() > 0 {
            if first_primary_found or secondary_content.len() > 0 {
              v(spacing_element)
            }

            text(size: 8pt)[
              #tertiary_content.join(", ")
            ]
          }
        ]
      )

      if i < data.len() - 1 {
        v(spacing_entry)
      }
    }
  ]
}
