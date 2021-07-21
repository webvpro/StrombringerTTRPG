// authMachine.js

import { createMachine, assign } from 'xstate';
import firebase from 'firebase'

const authenticate = data => firebase.auth().signInWithEmailAndPassword(data.email, data.password)
.then((userCredential) => {
  // Signed in
  var user = userCredential.user;
  // ...
})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
});
  

const machine = createMachine({
    id: 'login',
    initial: 'wake',
    context: {
      email: null,
      password: null
    },
    states: {
      wake: {
        initial: 'idle',
        states: {
          idle: {
            entry: 'clearContext',
            on: {
              SUBMIT: [
                {
                  target: 'loading',
                  cond: 'validateForm',
                  actions: [
                    assign({ 
                      email: (_, event) => event.email,
                      password: (_, event) => event.password
                    }),
                  ],
                },
                { target: 'fail' },
              ],
            },
          },
          loading: {
             invoke: {
              id: 'authenticate',
              src: context => authenticate(context),
              onDone: {
                target: 'success'
              },
              onError: {
                target: 'fail'
              },
            },
          },
          fail: {
            on: {
              SUBMIT: [
                {
                  target: 'loading',
                  cond: (ctx, event) => event.email && event.password !== '',
                  actions: [
                    assign({ 
                      email: (ctx, event) => event.email,
                      password: (ctx, event) => event.password
                    }),
                  ],
                },
                { target: 'fail' },
              ],
            },
          },
          success: {
            on: {
              SIGNOUT: 'idle'
            }
          },
          hist: {
            type: 'history',
            target: 'idle'
          },
        },
        on: {
          POWER: 'sleep'
        }
      },
      sleep: {
        on: {
          POWER: 'wake.hist'
        }
      }
    }
  },
  {
    actions: {
      clearContext: assign({
        email: null,
        password: null
      })
  },
    guards: {
      validateForm: (ctx, event) => event.email !== '' && event.password !== ''
  }
  });