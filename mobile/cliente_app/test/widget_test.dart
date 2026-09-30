import 'package:flutter_test/flutter_test.dart';
import 'package:cliente_app/main.dart';

void main() {
  testWidgets('Smoke test LimpyGoClientApp', (WidgetTester tester) async {
    await tester.pumpWidget(const LimpyGoClientApp());
    expect(find.byType(LimpyGoClientApp), findsOneWidget);
  });
}
