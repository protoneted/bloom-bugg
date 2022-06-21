let kwh = "kwh";
let co2 = "co2";
let water = "water";
let waste_recycle = "waste_recycle";
let no_of_tree = "no_of_tree";
let badge_green = "badge_green";
let badge_ev = "badge_ev";
let badge_solar = "badge_solar";
const calculator = (id, inputs) => {
  let x = 1
  let y = 1
  let z = 1
  if (inputs) {

    x = parseInt(JSON.parse(inputs)[0])
    y = parseInt(JSON.parse(inputs)[1])
    z = parseInt(JSON.parse(inputs)[2])
  }
  if (id == 1) {
    const r1 = 100 * x / 1000 * y
    const r2 = r1 * 0.85
    return [
      {
        type: kwh,
        value: r1
      }, {
        type: co2,
        value: r2
      }
    ]
  }
  else if (id == 2) {
    const r1 = 200 * x / 1000
    const r2 = r1 * 0.85
    return [
      {
        type: kwh,
        value: r1
      }, {
        type: co2,
        value: r2
      }
    ]
  }

  // ============================================== BADGE GREEN ==============================================
  else if (id == 3 || id == 5 || id == 6 || id == 17 || id == 18 || id == 20 || id == 21 || id == 25 || id == 28 || id == 29 || id == 30 || id == 31 || id == 33 || id == 34 || id == 36 || id == 37 || id == 39 || id == 40 || id == 41 || id == 44 || id == 45 || id == 51 || id == 54 || id == 56 || id == 57 || id == 58 || id == 59 || id == 60 || id == 61 || id == 62 || id == 63) {
    return [
      {
        type: badge_green,
        value: 1
      }
    ]
  }
  else if (id == 4) {
    const r1 = 200 * x / 1000
    const r2 = r1 * 0.85
    return [
      {
        type: co2,
        value: 2
      }, {
        type: water,
        value: 1.7
      }
    ]
  }
  else if (id == 7) {
    const r1 = x * 37.2
    const r2 = r1 * 0.85
    return [
      {
        type: kwh,
        value: r1
      }, {
        type: co2,
        value: r2
      }
    ]
  }
  else if (id == 8) {
    return [
      {
        type: kwh,
        value: 0.6
      }, {
        type: co2,
        value: 0.051
      }
    ]
  }
  else if (id == 9) {
    return [
      {
        type: kwh,
        value: 5
      }, {
        type: co2,
        value: 4.25
      }, {
        type: badge_solar,
        value: 1
      }
    ]
  }
  else if (id == 10) {
    return [
      {
        type: kwh,
        value: 2.5
      }, {
        type: co2,
        value: 2.125
      }
    ]
  }
  else if (id == 11 || id == 12 || id == 13 || id == 14) {
    const r1 = x * 0.172 / 1000
    return [
      {
        type: co2,
        value: r1
      }
    ]
  }
  else if (id == 15) {
    return [
      {
        type: badge_ev,
        value: 1
      }
    ]
  }
  else if (id == 16) {
    const r1 = (115 - 35) * x / 1000;
    return [
      {
        type: co2,
        value: r1
      }
    ]
  }
  else if (id == 19) {
    const r1 = 0.04 * 6 * x;
    return [
      {
        type: co2,
        value: r1
      }
    ]
  }
  else if (id == 22) {
    return [
      {
        type: co2,
        value: 0.03
      }
    ]
  }
  else if (id == 23) {
    return [
      {
        type: water,
        value: 22
      }
    ]
  }
  else if (id == 24) {
    return [
      {
        type: water,
        value: 30
      }
    ]
  }
  else if (id == 26) {
    return [
      {
        type: co2,
        value: 1.5
      },
      {
        type: water,
        value: 1000
      }
    ]
  }
  else if (id == 27) {
    return [
      {
        type: co2,
        value: 0.6
      }
    ]
  }
  else if (id == 32) {
    return [
      {
        type: co2,
        value: 55
      },
      {
        type: water,
        value: 12000
      }
    ]
  }
  else if (id == 35) {
    return [
      {
        type: kwh,
        value: 0.2
      },
      {
        type: co2,
        value: 0.17
      }
    ]
  }
  else if (id == 38 || id == 43) {
    const r1 = 7 * x;
    const r2 = 2700 * x;
    return [
      {
        type: co2,
        value: r1
      },
      {
        type: water,
        value: r2
      }
    ]
  }
  else if (id == 42) {
    const r1 = 7 * x;
    const r2 = 2700 * x;
    return [
      {
        type: co2,
        value: 0.18
      },
      {
        type: water,
        value: 6
      }
    ]
  }
  else if (id == 46) {
    const r1 = 1 * x;
    return [
      {
        type: waste_recycle,
        value: r1
      }
    ]
  }
  else if (id == 47) {
    const r1 = 7 * x;
    const r2 = 2700 * x;
    return [
      {
        type: water,
        value: 5000
      },
      {
        type: waste_recycle,
        value: 2.3
      }
    ]
  }
  else if (id == 48 || id == 49 || id == 50) {
    const r1 = 22;
    return [
      {
        type: co2,
        value: r1
      },
      {
        type: no_of_tree,
        value: 1
      }
    ]
  }
  else if (id == 52) {

    return [
      {
        type: water,
        value: 25
      }
    ]
  }
  else if (id == 53) {

    return [
      {
        type: water,
        value: 47
      }
    ]
  }


}



const unitCalculator = (data, impact) => {
  const sumResult = []
  const badgeResult = []
  Object.keys(data[0]).map((e, i, a) => {
    e == kwh ? sumResult.push({ Total: data[0][e], Unit: "KWH", Name: "Electricity Saved", Image: impact[0]["image"] }) : null
    e == co2 ? sumResult.push({ Total: data[0][e], Unit: "KG", Name: "Co2 saved", Image: impact[1]["image"] }) : null
    e == water ? sumResult.push({ Total: data[0][e], Unit: "L", Name: "Water saved", Image: impact[2]["image"] }) : null
    e == waste_recycle ? sumResult.push({ Total: data[0][e], Unit: "KG", Name: "Waste Recycle", Image: impact[3]["image"] }) : null
    e == no_of_tree ? sumResult.push({ Total: data[0][e], Unit: "", Name: "Trees Planted", Image: impact[4]["image"] }) : null


    e == badge_green ? badgeResult.push({ Total: data[0][e], Name: "Green Badge", Image: impact[5]["image"] }) : null
    e == badge_ev ? badgeResult.push({ Total: data[0][e], Name: "EV Badge", Image: impact[6]["image"] }) : null
    e == badge_solar ? badgeResult.push({ Total: data[0][e], Name: "Solar Badge", Image: impact[7]["image"] }) : null

  })
  return { sumResult, badgeResult }
}



module.exports = {
  calculator, unitCalculator,

}