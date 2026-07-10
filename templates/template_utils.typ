#let convert_string_to_length(string) = {
  if type(string) == str {
    if string.ends-with("pt") {
      return float(string.replace("pt", "")) * 1pt
    } else if string.ends-with("em") {
      return float(string.replace("em", "")) * 1em
    } else if string.ends-with("cm") {
      return float(string.replace("cm", "")) * 1cm
    } else if string.ends-with("mm") {
      return float(string.replace("mm", "")) * 1mm
    } else {
      return string
    }
  } else {
    return string
  }
}

#let convert_string_to_color(string_value) = {
  if type(string_value) == str {
    if string_value.starts-with("rgb(") and string_value.ends-with(")") {
      let rgb_str = string_value.slice(4, string_value.len() - 1)
      let components = rgb_str.split(",").map(s => int(float(s.trim())))
      if components.len() == 3 {
        return rgb(components.at(0), components.at(1), components.at(2))
      }
    } else if string_value.starts-with("rgba(") and string_value.ends-with(")") {
      let rgba_str = string_value.slice(5, string_value.len() - 1)
      let components = rgba_str.split(",")
      if components.len() == 4 {
        let r = int(float(components.at(0).trim()))
        let g = int(float(components.at(1).trim()))
        let b = int(float(components.at(2).trim()))
        let a = float(components.at(3).trim())
        return rgba(r, g, b, a)
      }
    } else if string_value.starts-with("#") {
      let hex = string_value.slice(1)
      if hex.len() == 6 {
        let r = int(hex.slice(0, 2), base: 16)
        let g = int(hex.slice(2, 4), base: 16)
        let b = int(hex.slice(4, 6), base: 16)
        return rgb(r, g, b)
      } else if hex.len() == 3 {
        let r = int(hex.at(0) + hex.at(0), base: 16)
        let g = int(hex.at(1) + hex.at(1), base: 16)
        let b = int(hex.at(2) + hex.at(2), base: 16)
        return rgb(r, g, b)
      }
    }
  }

  rgb(0, 0, 255)
}

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
    let raw = str(value).trim()
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

#let format_date(value, lang: "en") = {
  let normalized = normalize_present(value, lang: lang)
  if normalized == none {
    none
  } else if normalized == "Present" or normalized == "Obecnie" {
    normalized
  } else {
    let raw = str(normalized)
    if raw.len() >= 7 and raw.at(4) == "-" {
      let year = int(raw.slice(0, 4))
      let month = int(raw.slice(5, 7))
      let month_name = monthname(month, display: "short", lang: lang)
      if month_name == none { raw } else { month_name + " " + str(year) }
    } else {
      raw
    }
  }
}

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

#let join_nonempty(parts, separator: ", ") = {
  let items = ()
  for part in parts {
    if part != none and str(part).trim() != "" {
      items.push(str(part).trim())
    }
  }
  items.join(separator)
}
