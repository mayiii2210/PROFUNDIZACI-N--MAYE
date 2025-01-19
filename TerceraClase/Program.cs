using System;
using System.Numerics;

class Program
{
    static void Main(string[] args)
    {
        bool continuar = true;

        while (continuar)
        {
            Console.Clear();
            Console.WriteLine("Calculadora Mayculadora por consola (.NET 9)");
            Console.WriteLine("=========================================");

            Console.WriteLine("Selecciona una operación a realizar:");
            Console.WriteLine("1. Suma");
            Console.WriteLine("2. Resta");
            Console.WriteLine("3. Multiplicación");
            Console.WriteLine("4. División");
            Console.WriteLine("5. Raíz Cuadrada");
            Console.WriteLine("6. Elevar un número al cuadrado");
            Console.WriteLine("7. Elevar a un número");
            Console.WriteLine("8. Elevar un número al cubo");
            Console.WriteLine("9. Calcular porcentaje");
            Console.WriteLine("10. Salir");
            Console.Write("Tu elección: ");

            string operacion = Console.ReadLine() ?? "";
            double numero1 = 0, numero2 = 0, resultado = 0;
            Complex resultadoComplejo = 0;
            string descripcionOperacion = "";
            bool esComplejo = false;

            if (operacion == "5" || operacion == "6" || operacion == "8" || operacion == "9")
            {
                numero1 = ObtenerNumero("Introduce un número para operar: ");
            }
            else if (operacion != "10")
            {
                numero1 = ObtenerNumero("Introduce el primer número para operar: ");
                numero2 = ObtenerNumero("Introduce el segundo número para operar: ");
            }

            switch (operacion)
            {
                case "1":
                    resultado = numero1 + numero2;
                    descripcionOperacion = $"Suma: {numero1} + {numero2}";
                    break;
                case "2":
                    resultado = numero1 - numero2;
                    descripcionOperacion = $"Resta: {numero1} - {numero2}";
                    break;
                case "3":
                    resultado = numero1 * numero2;
                    descripcionOperacion = $"Multiplicación: {numero1} * {numero2}";
                    break;
                case "4":
                    if (numero2 == 0)
                    {
                        Console.WriteLine("Error: No se puede dividir por cero");
                        Console.WriteLine("Presiona cualquier tecla para continuar");
                        Console.ReadKey();
                        continue;
                    }
                    resultado = numero1 / numero2;
                    descripcionOperacion = $"División: {numero1} / {numero2}";
                    break;
                case "5":
                    if (numero1 < 0)
                    {
                        resultadoComplejo = Complex.Sqrt(new Complex(numero1, 0));
                        esComplejo = true;
                    }
                    else
                    {
                        resultado = Math.Sqrt(numero1);
                    }
                    descripcionOperacion = $"Raíz cuadrada de {numero1}";
                    break;
                case "6":
                    resultado = Math.Pow(numero1, 2);
                    descripcionOperacion = $"{numero1} elevado al cuadrado";
                    break;
                case "7":
                    resultado = Math.Pow(numero1, numero2);
                    descripcionOperacion = $"{numero1} elevado a la potencia de {numero2}";
                    break;
                case "8":
                    resultado = Math.Pow(numero1, 3);
                    descripcionOperacion = $"{numero1} elevado al cubo";
                    break;
                case "9":
                    resultado = (numero1 / 100) * numero2;
                    descripcionOperacion = $"{numero1}% de {numero2}";
                    break;
                case "10":
                    continuar = false;
                    Console.WriteLine("Gracias por usar la calculadora.");
                    break;
                default:
                    Console.WriteLine("Operación no válida");
                    Console.WriteLine("Presiona cualquier tecla para continuar");
                    Console.ReadKey();
                    continue;
            }

            if (continuar && operacion != "10")
            {
                if (esComplejo)
                    Console.WriteLine($"Resultado: {resultadoComplejo}");
                else
                    Console.WriteLine($"Resultado: {resultado}");
            }

            Console.WriteLine("Presiona cualquier tecla para continuar");
            Console.ReadKey();
        }
    }

    static double ObtenerNumero(string mensaje)
    {
        double numero;
        Console.Write(mensaje);
        while (!double.TryParse(Console.ReadLine(), out numero))
        {
            Console.WriteLine("Entrada inválida, por favor introduce un número.");
            Console.Write(mensaje);
        }
        return numero;
    }
}
