import React from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import styles from './Subscribe.module.scss';

export default class Subscribe extends React.Component {
  constructor() {
    super();
    this.state = { email: '', result: null };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(this.state.email, { FNAME: this.state.name });
    if (result.result === 'error') {
      window.confirm('Whoops, you are already subscribed!');
    } else {
      window.confirm(`Thank you for subscribing ${this.state.name}!`);
    }
    this.setState({ result });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p className={styles['subscribe__title']}>Subscribe to my mailing list!</p>
        <div>
          <input className={styles['subscribe__input']}
            placeholder="Name"
            name="name"
            type="text"
            onChange={this.handleNameChange}
          />
          <input className={styles['subscribe__input']} required
            placeholder="Email address"
            name="email"
            type="text"
            onChange={this.handleEmailChange}
          />
          <div>
          <button className={styles['subscribe__button']} type="submit">Subscribe</button>
          </div>
        </div>
      </form>
    );
  }
}