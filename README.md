# My response

## What I have done

I first wondered if we should implement all the individual conversation pages as SSR rendered and cached pages ? I think the response is no, and it may be the trap of the exercise ?

I choosed to benefit from this test by documenting and working on [Redux Toolkit](https://redux-toolkit.js.org/) I was not using yet with redux, and on [Next Redux Wrapper](https://github.com/kirill-konshin/next-redux-wrapper).

First effective dev on Next too, I come from [Gastby](https://www.gatsbyjs.com/). Next is a target and I would be really pleased to learn more of it.

The result is a working messaging feature based on a Redux store where it is possible to post and receive messages in conversations, and to create new conversations. The whole redux store is initialized on the browser, so that the pages does not cache conversation specific data. It persists nicely across all pages (There are pitfalls when using Next & Redux !)

Many parts are quick and dirty

Let's talk about it !

## Spent time

Approximatly one working day to build the app, but some time on TS issues :-/

... and some extra time documenting and conceiving it.

## Improvements / TODO

So many things remains to do, but its just a 4h exercise right ?

### API

Implementation could be easier with a strongest API, and dedicated endpoints. I added a new one as an example to get new messages in a conversation.

Please note I had to fix the middleware, it was relying on the db state at server startup...

Build a microservice to expose a websocket and do realtime store update when new message, conversation or user are created. (avoid polling !)

or use tools like [RTK query](https://redux-toolkit.js.org/rtk-query/overview) to abstract all the fetching layer.

Will depend on the preference between big basic http traffik or ability to maintain many websocket connexions.

### TS

Improve the typescript typing. I am not a typescript Guru and need to build muscles on that !

### Tests

Fully remains todo !

### css / design

I choosed not to focus on it, minimal/working version.

### eror handling

A few cases are handled as examples, many cases remain to handle.

### more

A few things we could add (with API improvement costs)
- A Bot adding automatically messages and responding, to feel less alone while developing ;-)
- Conversation status in the menu
- Notifications on new messages
- Read/Sent statuses on messages
- Persist parts of the store in the browser and hydrate nicely
- ...

# Context :

At leboncoin, our users can share messages about a transaction, or ask for informations about any products.

Your job is to create the interface to consult those messages.
The interface needs to work on both desktop & mobile devices.

In addition to your code, a README explaining your thought process and your choices would be appreciated.

# Exercice :

- Display a list of all the conversations
- Allow the user to select a conversation
  - Inside the conversation, there is a list of all the messages between these two users.
  - As a user, you can type and send new messages in this conversation

**As your application can be used by millions of users, make sure to provide some robust safety guards.**

### Sketches :

Obvisouly, it is up to you to make something nice and pretty, you are free to design it the way you like. The sketches are here to give you an idea on how it should look.

<details>
  <summary>Click to see the sketches</summary>

Mobile list :

![](./sketches/list-mobile.jpg)

Desktop list :

![](./sketches/list-desktop.jpg)

Mobile conversation :

![](./sketches/conv-mobile.jpg)

Desktop conversation :

![](./sketches/conv-desktop.jpg)

</details>

### API :

You can find the API swagger file in `docs/api-swagger.yaml`.

For a better readibility, you can view it on [https://leboncoin.tech/frontend-technical-test/](https://leboncoin.tech/frontend-technical-test/).

---

## Bonus 1 :

We provide some conversation samples, but can you improve the app so the user can now create new conversations ?

## Bonus 2 :

Our infrastructure is a bit shaky.. Sometimes the servers are crashing. “It’s not you, it’s me”, but maybe you can display something nice to warn the user and handle it gracefully.

## Do you want to make the app even better ?

Feel free to make as many improvements as you like.
We love creativity and technical challenges.

If you are out of ideas, here are some thoughts :

- As we want to reach our users anywhere, we need to make sure the app is performing well. What can you do to make it really fast ?

- Our goal is to support everybody in the country, including people with disabilities. As a good citizen and a good developer, can you make sure the app is accessible for everyone ?

- We all love to relax after a hard day’s work. It would be a shame if we didn’t feel confident enough about the upcoming automatic deployment. Are you sure everything has been tested thoroughly ?
