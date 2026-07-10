#let layout-bullet-list(data, isbreakable: true) = {
  let bullet_width = 2em

  block(width: 100%, breakable: isbreakable)[
    #if type(data) == array {
      for (index, item) in data.enumerate() {
        grid(
          columns: (bullet_width, 1fr),
          gutter: 1em,
          align(right)[•],
          [#eval(item, mode: "markup")]
        )

        if index < data.len() - 1 {
          v(0.05em)
        }
      }
    } else {
      [No items found]
    }
  ]
}
