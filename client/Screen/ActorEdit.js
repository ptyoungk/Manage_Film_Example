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
  DatePicker,
} from "native-base";
import SecurityService from "../security/SecurityService";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Custom Actions


// START IMPORT ACTIONS
import ActorActions from "../redux/actions/ActorActions";
import FilmActions from "../redux/actions/FilmActions";

// END IMPORT ACTIONS

/** APIs

* actionsActor.create
*	@description CRUD ACTION create
*
* actionsActor.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsActor.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsFilm.findBycast
*	@description CRUD ACTION findBycast
*	@param Objectid key - Id of model to search for
*

**/


class ActorEdit extends Component {
  
  // Init actor
  constructor(props) {
    super(props);
    this.state = {
      actor: {},
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
        this.props.actionsActor.loadActor(itemId);
        this.props.actionsFilm.findBycast(itemId);
      } else {
        this.setState({
          actor: {}
        });
      }
      
    });
  }

  // Clear reducer
  componentWillUnmount() {
    this.setState({
      actor: {}
    });
    this.props.actionsActor.reset();
  }

  // Insert props actor in state
  componentWillReceiveProps(props) {
    this.setState({
      actor: props.actor
    });
  }

  // Save data
  save() {
    // Validation
    let errors = {};
    
    if (!this.state.actor.name || this.state.actor.name.trim() === "") {
      errors.name = true;
    }
    

    this.setState({ errors: errors });
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Save
    if (this.state.actor._id) {
      // Edit
      this.props.actionsActor.saveActor(this.state.actor).then(data => {
        this.props.navigation.navigate("ActorList");
      });
    } else {
      // Create
      this.props.actionsActor.createActor(this.state.actor).then(data => {
        this.props.navigation.navigate("ActorList");
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
            <Title>Detail Actor</Title>
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
                BirthDate
              </Label>
              <DatePicker
                placeHolderText="Select a date"
                defaultDate={this.state.actor.birthDate }
                onDateChange={value => 
                  this.setState(Object.assign(this.state.actor, { birthDate: value }))
                }
              />
            </Item>
            
            
            <Item floatingLabel {...(this.state.errors && this.state.errors.name === true ? { style: styles.validatorItem } : {})}>
              <Label
                {...(this.state.errors && this.state.errors.name === true ? { style: styles.validatorLabel } : {})}>
                Name *
              </Label>
              <Input
                onChangeText={value =>
                  this.setState(Object.assign(this.state.actor, { name: value }))
                }
                value={this.state.actor.name && this.state.actor.name.toString()}
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
                  this.setState(Object.assign(this.state.actor, { surname: value }))
                }
                value={this.state.actor.surname && this.state.actor.surname.toString()}
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
    actionsActor: bindActionCreators(ActorActions, dispatch),
    actionsFilm: bindActionCreators(FilmActions, dispatch),
  };
};

// Validate types
ActorEdit.propTypes = { 
  actionsActor: PropTypes.object.isRequired,
  actionsFilm: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    actor: state.ActorEditReducer.actor,
    listFilm: state.ActorEditReducer.listFilm
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActorEdit);

const styles = StyleSheet.create({
  validatorItem: { borderColor: "red" },
  validatorLabel: { color: "red" },
  validatorMessage: { color: "red", marginLeft: 15, marginTop: 5 }
});
