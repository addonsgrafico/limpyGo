import 'package:flutter_test/flutter_test.dart';
import 'package:trabajador_app/main.dart';

void main() {
  testWidgets('Worker app launches smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const LimpyGoWorkerApp());
    expect(find.byType(LimpyGoWorkerApp), findsOneWidget);
  });
}
