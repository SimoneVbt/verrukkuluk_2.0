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
    paddingTop: 5,
    paddingBottom: 15
}

const cardItemStyle = {
    backgroundColor: beige,
    paddingTop: 10,
    paddingBottom: 0,
    flexDirection: "row"
}

const tabCardStyle = {
    backgroundColor: beige,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "column"
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

const buttonStyle = {
    backgroundColor: darkRed,
    margin: 5,
    borderRadius: 10
}

const buttonTextStyle = {
    color: white,
    fontWeight: "bold"
}

export {
    gold, darkRed, white, beige,
    cardStyle, cardItemStyle, tabCardStyle,
    buttonStyle, buttonTextStyle,
    titleStyle, starStyle,
    HeaderFooter
}