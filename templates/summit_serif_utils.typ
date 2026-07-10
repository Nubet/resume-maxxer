#let monthname(n, display: "short", lang: "en") = {
  n = int(n)
  let month = ""
  let month_short = ""

  if lang == "pl" {
    if n == 1 { month = "styczeń"; month_short = "sty" }
    else if n == 2 { month = "luty"; month_short = "lut" }
    else if n == 3 { month = "marzec"; month_short = "mar" }
    else if n == 4 { month = "kwiecień"; month_short = "kwi" }
    else if n == 5 { month = "maj"; month_short = "maj" }
    else if n == 6 { month = "czerwiec"; month_short = "cze" }
    else if n == 7 { month = "lipiec"; month_short = "lip" }
    else if n == 8 { month = "sierpień"; month_short = "sie" }
    else if n == 9 { month = "wrzesień"; month_short = "wrz" }
    else if n == 10 { month = "październik"; month_short = "paź" }
    else if n == 11 { month = "listopad"; month_short = "lis" }
    else if n == 12 { month = "grudzień"; month_short = "gru" }
  } else {
    if n == 1 { month = "January"; month_short = "Jan" }
    else if n == 2 { month = "February"; month_short = "Feb" }
    else if n == 3 { month = "March"; month_short = "Mar" }
    else if n == 4 { month = "April"; month_short = "Apr" }
    else if n == 5 { month = "May"; month_short = "May" }
    else if n == 6 { month = "June"; month_short = "Jun" }
    else if n == 7 { month = "July"; month_short = "Jul" }
    else if n == 8 { month = "August"; month_short = "Aug" }
    else if n == 9 { month = "September"; month_short = "Sep" }
    else if n == 10 { month = "October"; month_short = "Oct" }
    else if n == 11 { month = "November"; month_short = "Nov" }
    else if n == 12 { month = "December"; month_short = "Dec" }
  }

  if month == "" {
    none
  } else if display == "short" {
    month_short
  } else {
    month
  }
}

#let normalize_present(value, lang: "en") = {
  if value == none {
    none
  } else {
    let raw = str(value)
    if raw == "" {
      none
    } else {
      let lowered = lower(raw)
      if lowered == "present" or lowered == "obecnie" {
        if lang == "pl" { "Obecnie" } else { "Present" }
      } else {
        raw
      }
    }
  }
}

#let strpdate(isodate, lang: "en") = {
  let normalized = normalize_present(isodate, lang: lang)
  if normalized == none {
    none
  } else if normalized == "Present" or normalized == "Obecnie" {
    normalized
  } else {
    let raw = str(normalized)
    if raw.len() < 7 {
      raw
    } else {
      let year = int(raw.slice(0, 4))
      let month = int(raw.slice(5, 7))
      let month_name = monthname(month, display: "short", lang: lang)

      if month_name == none { raw } else { month_name + " " + str(year) }
    }
  }
}

#let daterange(start, end) = {
  if start != none and end != none [
    #start #sym.dash.en #end
  ]
  if start == none and end != none [
    #end
  ]
  if start != none and end == none [
    #start
  ]
}
