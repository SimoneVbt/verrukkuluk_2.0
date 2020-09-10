const gold = "rgb(240, 170, 40)";
const darkRed = "rgb(178, 51, 8)";
const white = "rgb(255, 255, 255)";
const beige = "rgb(254, 246, 231)";

const HeaderFooter = {
    backgroundColor: gold,
    height: 65
}

const cardStyle = {
    backgroundColor: beige,
    paddingTop: 10,
    paddingBottom: 0,
    flexDirection: "row"
}

const tabCardStyle = {
    paddingTop: 5,
    paddingBottom: 15,
    backgroundColor: beige
}

const titleStyle = {
    color: darkRed,
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold"
}

const starStyle = {
    color: darkRed,
    fontSize: 28,
    paddingLeft: 2,
    paddingBottom: 2,
    margin: -1
}

export {
    gold, darkRed, white, beige,
    cardStyle, tabCardStyle, titleStyle, starStyle, 
    HeaderFooter
}