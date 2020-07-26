import 'package:flutter/material.dart';
import 'package:reciped/screens/anon/login/login_screen.dart';
import 'package:reciped/screens/anon/register/register_screen.dart';

final routes = <String, WidgetBuilder>{
  '/': (BuildContext context) => LoginScreen(),
  '/register': (BuildContext context) => RegisterScreen(),
};
