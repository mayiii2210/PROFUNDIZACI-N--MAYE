public abstract class Empleado
{
    public String Nombre {  get; set; }

    protected Empleado(string nombre)
    {
        Nombre = nombre;
    }
    public abstract decimal calcularSalario();

    public override string ToString()
    {
        return $"Empleado: {Nombre}";
    }
}

public class EmpleadoTiempoCompleto : Empleado
{
    public decimal SalarioAnual { get; set; }

    public EmpleadoTiempoCompleto (string nombre, decimal salarioAnual) : base (nombre)
    {
        SalarioAnual = salarioAnual;    
    }

    public override decimal calcularSalario()
    {
        return SalarioAnual / 12;
    }

}

public class EmpleadoPorHora : Empleado
{
    public decimal TarifaxHora { get; set; }
    public int HorasTrabajas { get; set; }

    public EmpleadoPorHora(string nombre, decimal tarifaxHora, int horasTrabajadas) : base(nombre)
    {
        TarifaxHora = tarifaxHora;
        HorasTrabajas = horasTrabajadas;
    }

    public override decimal calcularSalario()
    {
        return TarifaxHora * HorasTrabajas;
    }

}

class Program
{
    static void Main(string[] args)
    {
        List<Empleado> empleados = new List<Empleado>
        {
            new EmpleadoTiempoCompleto("Mayerly Salas", 20000),
            new EmpleadoPorHora("Rosa Rouz", 3000, 5),
            new EmpleadoTiempoCompleto("Pepito Ruiz", 56000),
            new EmpleadoPorHora("Niño Salas", 8000, 10)

        };

        foreach (Empleado empleado in empleados)
        {
            Console.WriteLine($"{empleado.ToString()} - Salario: {empleado.calcularSalario():c}");
        }
    }
}
