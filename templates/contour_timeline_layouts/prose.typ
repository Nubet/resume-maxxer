#let layout-prose(data, isbreakable: true) = {
  let left_margin = 2em

  block(width: 100%, breakable: isbreakable)[
    #if type(data) == array {
      for (index, item) in data.enumerate() {
        grid(
          columns: (1fr),
          pad(left: left_margin)[
            #eval(item, mode: "markup")
          ]
        )

        if index < data.len() - 1 {
          v(0.05em)
        }
      }
    } else if type(data) == str {
      pad(left: left_margin)[
        #eval(data, mode: "markup")
      ]
    } else {
      [No entries found]
    }
  ]
}
