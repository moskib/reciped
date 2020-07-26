import 'package:flutter/material.dart';

class LoginFrom extends StatelessWidget {
  final String passwordText = 'password';
  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        children: <Widget>[
          SizedBox(
            height: 20.0,
          ),
          TextFormField(
            decoration: const InputDecoration(
              hintText: 'Username',
              labelText: 'Username',
            ),
          ),
          SizedBox(
            height: 20.0,
          ),
          TextFormField(
            decoration: const InputDecoration(
              hintText: 'Password',
              labelText: 'Password',
            ),
          ),
          SizedBox(
            height: 20.0,
          ),
          RaisedButton(
            onPressed: () {
              print('clicked');
            },
            child: Text('Submit'),
          )
        ],
      ),
    );
  }
}
