import React, { Component } from "react";
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import PropTypes from "prop-types";
import update from "immutability-helper";

const userImg = require("../assets/images/user.png");

const data = [
  {
    image: userImg,
    name: "리신",
    Occupation: "눈먼 수도승",
    description: `리 신은 어린 소년이었을 때 자신이 용의 힘을 사용하도록 용의 선택을
    받았다며 쇼진 수도원에 왔다. 원로 수도승들은 이 재능 있는
    아이에게서 용의 불꽃이 번쩍이는 것을 보았으나, 동시에 아이의
    무모한 자만심과 이로 불거질 재앙 또한 감지했다. 그럼에도 그들은
    조심스럽게 리 신을 제자로 받아들였다. 그러나 다른 제자들이
    진보하는 동안 리 신에게는 접시를 닦고 바닥을 청소하는 일만 시켰다.`,
    showThumbnail: true, //썸네일 - true, 원본 - false
  },
];

// 컴포넌트 정의
const ProfileCard = (props) => {
  const { image, name, Occupation, description, onPress, showThumbnail } =
    props; // props의 값을 { } 안의 변수로 저장
  //썸네일 일 경우 cardThumbnail스타일 적용 하기위해 변수로 저장
  let containerStyles = [styles.cardContainer];
  // 썸네일 일 경우 80%축소 위해 scale 0.2 스타일 적용 조건문
  if (showThumbnail) {
    containerStyles.push(styles.cardThumbnail);
  }
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[containerStyles]}>
        <View style={styles.cardImgageContainer}>
          <Image style={styles.cardImage} source={image}></Image>
        </View>
        <View>
          <Text style={styles.cardName}>{name}</Text>
        </View>
        <View style={styles.cardOccupationContainer}>
          <Text style={styles.cardOccupation}>{Occupation}</Text>
        </View>
        <View>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

//ProfileCard 컴포넌트 타입 지정
ProfileCard.propTypes = {
  image: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  showThumbnail: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default class App extends Component {
  // react native 생성자
  constructor(props, context) {
    super(props, context); //부모(Component) 생성자 props, context -super는 부모
    this.state = { data: data }; //state 설정
  }
  //onPress이벤트 발생시 동작 함수 정의
  handleProfileCardPress = (index) => {
    const showThumbnail = !this.state.data[index].showThumbnail;
    // 변경값 저장
    this.setState({
      data: update(this.state.data, {
        [index]: { showThumbnail: { $set: showThumbnail } },
      }),
    });
  };
  render() {
    // 카드프로필 들 화면 출력 하기 위해 profileCard 컴포넌트 생성
    const list = this.state.data.map(function (item, index) {
      const { image, name, Occupation, description, showThumbnail } = item;
      return (
        <ProfileCard
          key={"card" + index}
          image={image}
          name={name}
          Occuption={Occupation}
          description={description}
          onPress={this.handleProfileCardPress.bind(this, index)}
          showThumbnail={showThumbnail}
        />
      );
    }, this);
    return <View style={styles.container}>{list}</View>;
  }
}

const profileCardColor = "dodgerblue";

const styles = StyleSheet.create({
  cardThumbnail: {
    transform: [{ scale: 0.2 }],
  },
  cardName: {
    color: "white",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 24,
    textShadowColor: "black",
    textShadowOffset: { height: 2, width: 2 },
    textShadowRadius: 3,
  },
  cardOccupationContainer: {
    borderColor: "black",
    borderWidth: 3,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  cardOccupation: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  cardDescription: {
    fontStyle: "italic",
    marginTop: 10,
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    alignItems: "center",
    borderColor: "black",
    borderWidth: 3,
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: profileCardColor,
    width: 300,
    height: 400,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: 10 },
        shadowOpacity: 1,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  cardImgageContainer: {
    // alignItems: "center",
    // backgroundColor: "white",
    // width: 120,
    // height: 120,
    // borderColor: "black",
    // borderWidth: 3,
    // borderRadius: 60,
    marginTop: 30,
  },
  cardImage: { width: 140, height: 160 },
});
