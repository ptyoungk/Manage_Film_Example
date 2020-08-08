import React, { Component } from "react";
import { StyleSheet } from "react-native";
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
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions


// START IMPORT ACTIONS
import FilmMakerActions from "../redux/actions/FilmMakerActions";
import FilmActions from "../redux/actions/FilmActions";

// END IMPORT ACTIONS

/** APIs

* actionsFilmMaker.create
*	@description CRUD ACTION create
*
* actionsFilmMaker.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsFilmMaker.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsFilm.findByfilmMaker
*	@description CRUD ACTION findByfilmMaker
*	@param Objectid key - Id of model to search for
*

**/


class FilmMakerEdit extends Component {
  
  // Init filmmaker
  constructor(props) {
    super(props);
    this.state = {
      filmmaker: {},
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
        this.props.actionsFilmMaker.loadFilmMaker(itemId);
        this.props.actionsFilm.findByfilmMaker(itemId);
      } else {
        this.setState({
          filmmaker: {}
        });
      }
      
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      filmmaker: {}
    });
    this.props.actionsFilmMaker.reset();
  }

  // Insert props filmmaker in state
  componentWillReceiveProps(props) {
    this.setState({
      filmmaker: props.filmmaker
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.filmmaker.name || this.state.filmmaker.name.trim() === "") {
      errors.name = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.filmmaker._id) {
      // Edit
      this.props.actionsFilmMaker.saveFilmMaker(this.state.filmmaker).then(data => {
        this.props.navigation.navigate("FilmMakerList");
      });
    } else {
      // Create
      this.props.actionsFilmMaker.createFilmMaker(this.state.filmmaker).then(data => {
        this.props.navigation.navigate("FilmMakerList");
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
            <Title>Detail FilmMaker</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.save()}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.name === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.name === true ? { style: styles.validatorLabel } : {})}>
                Name *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.filmmaker, { name: value }))
                }
                value={this.state.filmmaker.name && this.state.filmmaker.name.toString()}
              />
            </Item>
            {this.state.errors && this.state.errors.name === true && (
              <Text style={styles.validatorMessage}>Value is required</Text>
            )}
          
            
            <Item floatingLabel>
              <Label>
                Surname
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.filmmaker, { surname: value }))
                }
                value={this.state.filmmaker.surname && this.state.filmmaker.surname.toString()}
              />
            </Item>
          

          {/* RELATIONS */}
          
          {/* EXTERNAL RELATIONS */}
          
          {/* External relation with Film */}

          

          </Form>
        </Content>
      </Container>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsFilmMaker: bindActionCreators(FilmMakerActions, dispatch),
    actionsFilm: bindActionCreators(FilmActions, dispatch),
  };
};

// Validate types
FilmMakerEdit.propTypes = { 
  actionsFilmMaker: PropTypes.object.isRequired,
  actionsFilm: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    filmmaker: state.FilmMakerEditReducer.filmmaker,
    listFilm: state.FilmMakerEditReducer.listFilm
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmMakerEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
