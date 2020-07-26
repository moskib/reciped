import 'package:flutter/material.dart';

class RecipedCard extends StatelessWidget {
  const RecipedCard(
      {Key key, @required this.cardWidth, this.carBorderRadius, this.contents})
      : super(key: key);

  final double cardWidth;
  final double carBorderRadius;
  final Widget contents;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(
        horizontal: cardWidth,
      ),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(.95),
        borderRadius: BorderRadius.circular(carBorderRadius),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(.25),
            blurRadius: 10.0,
            spreadRadius: 2.0,
            offset: Offset(2.0, 2.0),
          ),
        ],
      ),
      child: contents,
    );
  }
}
