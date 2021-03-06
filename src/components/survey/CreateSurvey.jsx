import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

import Divider from '../../styles/Divider';
import Question from './Question';
import { AddButton, Container, ButtonGroup } from './SurveyStyles';

import { CREATE_NEW_SURVEY } from '../../graphql/mutations';
import TextInput from '../common/TextInput';
import Button from '../../styles/Button';
import { GET_SURVEYS } from '../../graphql/queries';

class CreateSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      questions: [],
      redirectToIndex: false,
    };
  }

  handleChangeQuestion = (index, e) => {
    const { name, value } = e.target;

    this.setState((prev) => ({
      questions: prev.questions.map((q, i) => {
        if (index === i) {
          return {
            ...q,
            [name]: value,
          };
        }
        return q;
      }),
    }));
  };

  removeQuestion = (index) => {
    this.setState((prev) => ({
      questions: prev.questions.filter((current, i) => index !== i),
    }));
  };

  handleChangeSurvey = (e) => {
    this.setState({ title: e.target.value });
  };

  cancelSurvey = () => {
    this.props.history.push('/dashboard');
  };

  updateCache = (cache, { data: { createNewSurvey } }) => {
    const { getUserSurveys } = cache.readQuery({ query: GET_SURVEYS });
    cache.writeQuery({
      query: GET_SURVEYS,
      data: {
        getUserSurveys: getUserSurveys.concat(createNewSurvey),
      },
    });
    this.setState({ redirectToIndex: true });
  }

  render() {
    const { title, questions, redirectToIndex } = this.state;
    if (redirectToIndex) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Container className="container">
        <div className="col-md survey-row">
          <Mutation mutation={CREATE_NEW_SURVEY} update={this.updateCache}>
            {(createNewSurvey) => (
              <form
                className="p-5"
                action="#!"
                onSubmit={(e) => {
                  e.preventDefault();
                  let questionsAreValid = true;

                  questions.forEach((q) => {
                    if (!q.question) {
                      toast('Please provide all questions', {
                        className: 'toast-error',
                      });
                      questionsAreValid = false;
                    }
                    if (!q.type) {
                      toast('Please specify a type for all questions', {
                        className: 'toast-error',
                      });
                      questionsAreValid = false;
                    }
                    if (q.question && q.question.length < 5) {
                      toast(
                        'Each question must be at least 5 characters long',
                        { className: 'toast-error' },
                      );
                      questionsAreValid = false;
                    }
                  });

                  if (!title) {
                    toast('Survey title required', {
                      className: 'toast-error',
                    });
                  } else if (questionsAreValid) {
                    createNewSurvey({
                      variables: { input: { title, questions } },
                    });
                    toast('Survey created successfully', {
                      className: 'toast-success',
                    });
                  }
                }}
              >
                <h1 className="text-center create-survey-title f-1">
                  Create a Survey
                </h1>
                <Divider size={30} />
                <TextInput
                  title="Survey Title"
                  id="title"
                  value={title}
                  name={title}
                  onChange={this.handleChangeSurvey}
                />

                <div>
                  <h2 className="questions-title f-1">Survey Questions</h2>
                  <Divider size={30} />

                  {questions.map((question, index) => (
                    <Question
                      key={index.toString()}
                      question={question.question}
                      type={question.type}
                      index={index}
                      handleChangeQuestion={this.handleChangeQuestion}
                      removeQuestion={this.removeQuestion}
                    />
                  ))}

                  <div className="text-center">
                    <AddButton
                      type="button"
                      className="btn btn-light"
                      onClick={() => {
                        this.setState((prev) => ({
                          ...prev,
                          questions: prev.questions.concat({
                            question: '',
                            type: '',
                          }),
                        }));
                      }}
                    >
                      +
                    </AddButton>
                  </div>
                </div>

                <Divider size={30} />

                <div className="form-group ctrl">
                  <ButtonGroup>
                    <Button
                      className="btn btn-block"
                      type="button"
                      onClick={this.cancelSurvey}
                    >
                      Cancel
                    </Button>

                    <Button className="btn btn-block" type="submit">
                    Save Survey
                    </Button>
                  </ButtonGroup>
                </div>
              </form>
            )}
          </Mutation>
        </div>
      </Container>
    );
  }
}

CreateSurvey.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
export default CreateSurvey;
