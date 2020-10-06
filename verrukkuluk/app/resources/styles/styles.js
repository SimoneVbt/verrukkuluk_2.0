const gold = "rgb(240, 170, 40)";
const darkRed = "rgb(178, 51, 8)";
const white = "rgb(255, 255, 255)";
const beige = "rgb(254, 246, 231)";


/* === standard style */
const HeaderFooter = {
    backgroundColor: gold,
    height: 65
}

const titleStyle = {
    color: darkRed,
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold"
}

const subtitleStyle = {
    color: darkRed,
    fontSize: 18,
    fontWeight: "bold"
}

const messageStyle = {
    backgroundColor: white,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
    paddingHorizontal: 30,
    paddingVertical: 10
}


/* === tabs === */

const tabStyle = {
    backgroundColor: darkRed
}

const tabTextStyle = {
    color: white
}


/* === cards === */
const cardStyle = {
    backgroundColor: beige,
    paddingTop: 5,
    paddingBottom: 15
}

const backgroundCardStyle = {
    backgroundColor: beige,
    paddingTop: 5,
    marginBottom: 20
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


/* === buttons === */
const buttonStyle = {
    backgroundColor: darkRed,
    margin: 5,
    borderRadius: 10
}

const buttonTextStyle = {
    color: white,
    fontWeight: "bold"
}


/* === forms === */
const itemStyle = {
    margin: 10
}

const inputStyle = {
    color: white
}

const labelStyle = {
    color: white,
    fontStyle: "italic"   
}


export {
    gold, darkRed, white, beige,
    HeaderFooter, titleStyle, subtitleStyle, messageStyle,
    tabStyle, tabTextStyle,
    cardStyle, backgroundCardStyle, cardItemStyle, tabCardStyle,
    buttonStyle, buttonTextStyle,
    itemStyle, inputStyle, labelStyle
}