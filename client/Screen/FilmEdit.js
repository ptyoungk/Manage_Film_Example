import React, { Component } from "react";
import { StyleSheet } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import {
  Header,
  Title,
  Container,
  Content,
  Body,
  Button,
  Text,
  Icon,
  Right,
  Left,
  Form,
  ListItem,
  Item,
  Label,
  Input,
  Picker,
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions


// START IMPORT ACTIONS
import FilmActions from "../redux/actions/FilmActions";
import FilmMakerActions from "../redux/actions/FilmMakerActions";
import ActorActions from "../redux/actions/ActorActions";

// END IMPORT ACTIONS

/** APIs

* actionsFilm.create
*	@description CRUD ACTION create
*
* actionsFilm.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsFilm.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsFilmMaker.list
*	@description CRUD ACTION list
*
* actionsActor.list
*	@description CRUD ACTION list
*

**/


class FilmEdit extends Component {
  
  // Init film
  constructor(props) {
    super(props);
    this.state = {
      film: {},
      authorized: false
    };
  }

  // Load data on start
  componentWillMount() {

    this.props.navigation.addListener("willFocus", async () => { 
      // Check security
      if (await SecurityService.isAuth([  ])) {
        this.setState({ authorized: true });
      } else {
        this.props.navigation.navigate("Login", {
          showError: "Not authorized"
        });
        return;
      }


      // Load data
      const itemId = this.props.navigation.getParam("id", "new");
      if (itemId !== "new") {
        this.props.actionsFilm.loadFilm(itemId);
      } else {
        this.setState({
          film: {}
        });
      }
      
      this.props.actionsActor.loadActorList();
      this.props.actionsFilmMaker.loadFilmMakerList();
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      film: {}
    });
    this.props.actionsFilm.reset();
  }

  // Insert props film in state
  componentWillReceiveProps(props) {
    this.setState({
      film: props.film
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.film.title || this.state.film.title.trim() === "") {
      errors.title = true;
    }
    
    if (!this.state.film.filmMaker || this.state.film.filmMaker.trim() === "") {
      errors.filmMaker = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.film._id) {
      // Edit
      this.props.actionsFilm.saveFilm(this.state.film).then(data => {
        this.props.navigation.navigate("FilmList");
      });
    } else {
      // Create
      this.props.actionsFilm.createFilm(this.state.film).then(data => {
        this.props.navigation.navigate("FilmList");
      });
    }
  }

  // Show content
  render() { 

    // Check security
    if (!this.state.authorized) {
      return null;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
            transparent
            onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Detail Film</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.save()}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>
                Genre
              </Label>
              <Picker
                mode="dropdown"
                iosHeader="Select a value"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.film.genre }
                value={this.state.film.genre }
                onValueChange={value =>
                  this.setState(Object.assign(this.state.film, { genre: value }))
                }
              >
                <Picker.Item label="Action" value="Action" />
                <Picker.Item label="Crime" value="Crime" />
                <Picker.Item label="Fantasy" value="Fantasy" />
                <Picker.Item label="Horror" value="Horror" />
              </Picker>
            </Item>
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.title === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.title === true ? { style: styles.validatorLabel } : {})}>
                Title *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.film, { title: value }))
                }
                value={this.state.film.title && this.state.film.title.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.title === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                Year
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.film, { year: value }))
                }
                value={this.state.film.year && this.state.film.year.toString()}
              />
            </Item>
          

          {/* RELATIONS */}
          
          {/* Relation m:m cast with Actor */}
          
          <Item stackedLabel>              
            <Label >
              Cast
            </Label>
            <SectionedMultiSelect
              items={this.props.listActor }
              displayKey="_id"
              uniqueKey="_id"
              selectText="Choose some items..."
              alwaysShowSelectText={true}
              modalAnimationType={"slide"}
              renderSelectText={() => {
                return "Choose some items...";
              }}
              onSelectedItemsChange={value =>
                this.setState(Object.assign(this.state.film, { cast: value }))
              }
              selectedItems={this.state.film.cast }
            />
          </Item>
          
          
          {/* Relation 1:m filmMaker with FilmMaker */}
          
          <Item stackedLabel {...(this.state.errors && this.state.errors.filmMaker === true ? { style: styles.validatorItem } : {})}>
            <Label 
              {...(this.state.errors && this.state.errors.filmMaker === true ? { style: styles.validatorLabel } : {})}>
              FilmMaker *
            </Label>
            <Picker
              mode="dropdown"
              iosHeader="Select a value"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.film.filmMaker }
              value={this.state.film.filmMaker }
              onValueChange={value =>
                this.setState(Object.assign(this.state.film, { filmMaker: value }))
              }
            >
              {this.props.listFilmMaker &&
                this.props.listFilmMaker.map(row => (
                  <Picker.Item label={row._id} value={row._id} key={row._id}>
                    {row._id}
                  </Picker.Item>
                ))}
            </Picker>
          </Item>
            {this.state.errors && this.state.errors.filmMaker === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
          

          </Form>
        </Content>
      </Container>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsFilm: bindActionCreators(FilmActions, dispatch),
    actionsFilmMaker: bindActionCreators(FilmMakerActions, dispatch),
    actionsActor: bindActionCreators(ActorActions, dispatch),
  };
};

// Validate types
FilmEdit.propTypes = { 
  actionsFilm: PropTypes.object.isRequired,
  actionsFilmMaker: PropTypes.object.isRequired,
  actionsActor: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    film: state.FilmEditReducer.film,
    listActor: state.FilmEditReducer.listActor,
    listFilmMaker: state.FilmEditReducer.listFilmMaker
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
