import throttle from 'lodash.throttle';

const userFeedbackFormEl = document.querySelector('.feedback-form');
const userInfo = {};

const fillFeedbackFormFields = () => {
  try {
    const userInfoFromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    if (userInfoFromLS === null) {
      return;
    }
    console.log(userInfoFromLS);

    for (const prop in userInfoFromLS) {
      userFeedbackFormEl.elements[prop].value = userInfoFromLS[prop];
    }
  } catch (err) {
    console.error(err);
  }
};

fillFeedbackFormFields();

const onUserFeedbackFormChange = event => {
  const { target } = event;

  const fieldValue = target.value;
  const fieldName = target.name;

  userInfo[fieldName] = fieldValue;
  console.log(userInfo);

  localStorage.setItem('feedback-form-state', JSON.stringify(userInfo));
};

const onUserFeedbackFormSubmit = event => {
  event.preventDefault();

  userFeedbackFormEl.reset();
  localStorage.removeItem('feedback-form-state');
};

userFeedbackFormEl.addEventListener(
    'input',
    throttle(onUserFeedbackFormChange, 500)
);
userFeedbackFormEl.addEventListener('submit', onUserFeedbackFormSubmit);
