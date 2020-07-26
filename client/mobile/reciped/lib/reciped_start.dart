import 'package:flutter/material.dart';
import 'package:reciped/routes/routes.dart';
import 'package:reciped/styles/theme_constants.dart';

class RecipedStart {
  RecipedStart() {
    runApp(
      new MaterialApp(
        title: 'Reciped',
        routes: routes,
        theme: ThemeData.light().copyWith(
          inputDecorationTheme: kInputDecorationTheme,
        ),
      ),
    );
  }
}
