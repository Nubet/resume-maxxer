#let layout-numbered-list(data, isbreakable: true) = {
  let number_width = 2em

  block(width: 100%, breakable: isbreakable)[
    #if type(data) == array {
      for (index, citation) in data.enumerate() {
        grid(
          columns: (number_width, 1fr),
          gutter: 1em,
          align(right)[#(index + 1).],
          [#eval(citation, mode: "markup")]
        )

        if index < data.len() - 1 {
          v(0.05em)
        }
      }
    } else {
      [No entries found]
    }
  ]
}
