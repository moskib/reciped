import 'package:flutter/material.dart';
import 'package:reciped/screens/anon/login/components/login_form.dart';
import 'components/reciped_card.dart';

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final cardWidth = MediaQuery.of(context).size.width * 0.1;
    final carBorderRadius = 35.0;
    return Scaffold(
      // resizeToAvoidBottomPadding: false,
      backgroundColor: Colors.white,
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/images/loginBackground.jpg"),
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: Wrap(
            children: [
              RecipedCard(
                cardWidth: cardWidth,
                carBorderRadius: carBorderRadius,
                contents: Container(
                  margin: EdgeInsets.all(20),
                  child: Column(
                    children: <Widget>[
                      Text(
                        'Login',
                        style: TextStyle(
                          fontFamily: 'Allura',
                          fontSize: 60,
                        ),
                      ),
                      LoginFrom(),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
