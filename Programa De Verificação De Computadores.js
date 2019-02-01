
// 1 - LER O NOME DA MÁQUINA

var pcName = function() {

	var objWMIService = GetObject( "winmgmts://./root/cimv2" )

	
	var colItems = objWMIService.ExecQuery( "Select * from Win32_ComputerSystem", null , 48 )


	var colProps = new Enumerator(colItems);

	
	var pcName;

	
	for ( ; !colProps.atEnd(); colProps.moveNext()) { 
	
		p = colProps.item();
		
		pcName = p.name;
	}
	
	
	return pcName;
}


// 2 - LER O TIPO DA MÁQUINA

var tipoMaquina = function() {
	

	var myComputer = ".";
	
	var objWMIService = GetObject( "winmgmts:\\\\" + myComputer + "\\root\\cimv2" );
	
	
	var colItems = objWMIService.ExecQuery( "Select * from Win32_Battery" );
	
	
	var IsLaptop = false;
	
	var objItem = new Enumerator(colItems);
	
	for (;!objItem.atEnd();objItem.moveNext()) {
	
		IsLaptop = true;
	}
	
	if (IsLaptop){
		
		tipoMaquina = "laptop";
	
	} else {
		
		tipoMaquina = "desktop";	
	}
	
	return tipoMaquina;
}


// 3 - LER O TOTAL DE MEMÓRIA

var TotalMemoria = function() {
	
	var objWMIService = GetObject( "winmgmts://./root/cimv2" )
	var colItems = objWMIService.ExecQuery( "Select * from Win32_ComputerSystem", null , 48 )
	var colProps = new Enumerator(colItems);
	var pcName;
	for ( ; !colProps.atEnd(); colProps.moveNext()) { 
		p = colProps.item();
		pcName = p.name
	}

	var colItems = objWMIService.ExecQuery("Select * from Win32_PhysicalMemory",null,48)
	var colProps = new Enumerator(colItems);
	var totalMemory = 0;;
	for ( ; !colProps.atEnd(); colProps.moveNext()) { 
		p = colProps.item();
		totalMemory += ( p.Capacity/1048576 );
	}
	
	
	return totalMemory;
}


// 4 - LER O ESPAÇO EM DISCO(S)

var hdinfo = function() {

	var objWMIService = GetObject( "winmgmts://./root/cimv2" )
	var colItems = objWMIService.ExecQuery( "Select * from Win32_ComputerSystem", null , 48 )
	var colProps = new Enumerator(colItems);
	var hdPct;
	for ( ; !colProps.atEnd(); colProps.moveNext()) { 
		p = colProps.item();
		hdPct = p.name
	}

	var colItems = objWMIService.ExecQuery("Select * from Win32_LogicalDisk where DriveType=3	",null,48)
	var colProps = new Enumerator(colItems);

	for ( ; !colProps.atEnd(); colProps.moveNext()) { 
		p = colProps.item();
		WScript.Echo ("drive: "+p.name);
		WScript.Echo ("tamanho: "+p.Size/(1024*1024*1024));
		WScript.Echo ("espaço livre: "+p.FreeSpace/(1024*1024*1024)	);
		WScript.Echo ("total de % em uso: "+ ((1 - p.FreeSpace/p.Size)*100)+"%");
		hdPct = parseInt((p.FreeSpace/(1024*1024*1024) * 100) / p.Size/(1024*1024*1024));
	}
	return hdPct;
}


// 5 - LER PROCESSOS QUE INICIAM AO LIGAR A MÁQUINA

var getStartup = function() {

	var objWMIService = GetObject( "winmgmts://./root/cimv2" )

	var colItems = objWMIService.ExecQuery("Select * from Win32_StartupCommand	",null,48)
	var colProps = new Enumerator(colItems);
	var processArray = new Array ();

	for ( ; !colProps.atEnd(); colProps.moveNext()) { 
		p = colProps.item();
		var obj = new Object ()
		processArray.push (p);
	}


	for (var i = 0; i< processArray.length; i+=1) {
		var process = processArray[i];
		WScript.Echo ("nome: "+process.Name );
	}



	return processArray;	
}

// 6 - LER PROCESSOS QUE ESTÃO RODANDO NO MOMENTO

var getProcesses = function() {

	var objWMIService = GetObject( "winmgmts://./root/cimv2" )

	var colItems = objWMIService.ExecQuery("Select * from Win32_Process	",null,48)
	var colProps = new Enumerator(colItems);
	var processArray = new Array ();

	for ( ; !colProps.atEnd(); colProps.moveNext()) { 
		p = colProps.item();
		var obj = new Object ()
		processArray.push (p);
	}


	for (var i = 0; i< processArray.length; i+=1) {
		var process = processArray[i];
		WScript.Echo ("nome: "+process.Name );
	}



	return processArray;	
}

// 7 -LER SERVIÇOS QUE ESTÃO RODANDO NO MOMENTO


var getServices = function() {

	var objWMIService = GetObject( "winmgmts://./root/cimv2" )

	var colItems = objWMIService.ExecQuery("Select * from Win32_Service	",null,48)
	var colProps = new Enumerator(colItems);
	var serviceArray = new Array ();

	for ( ; !colProps.atEnd(); colProps.moveNext()) { 
		p = colProps.item();
		var obj = new Object ()
		serviceArray.push (p);
	}


	for (var i = 0; i< serviceArray.length; i++) {
		var service = serviceArray[i];
		WScript.Echo ("nome: "+service.Name );
		WScript.Echo ("nome fantasia: "+service.DisplayName );
		WScript.Echo ("status: "+service.State  );
		WScript.Echo  ();
	}
		WScript.Echo("FIM");



	return serviceArray;	
}

// 8 - LER AS INTERFACES DE REDE DA MÁQUINA


var getInterfaces = function() {



	var wmi = GetObject("winmgmts://./root/CIMv2")
	var net = wmi.ExecQuery("SELECT * FROM Win32_NetworkAdapter Where PhysicalAdapter = True")
	for (var e = new Enumerator(net); !e.atEnd(); e.moveNext())
	{
	  var z = e.item()
	  WScript.Echo("- " + z.NetConnectionID);
	}
	return z
}


function clearScreen(){
	for(i=0 ; i<50; i++){
		
	}
}

function desenhaTela(){

	
	WScript.Echo('|-------------------------------------------------------------------------------|');
	WScript.Echo('|                                                                               |');
	WScript.Echo('|              RELAT\u00D3RIO DE MANUTEN\u00C7\u00C4O DE EQUIPAMENTO                 |');
	WScript.Echo('|                                                                               |');
	WScript.Echo('|               --------  MENU DE OP\u00C7\u00D5ES  ----------                  |');
	WScript.Echo('|                                                                               |');
	WScript.Echo('|              1 - LER O NOME DA M\u00C1QUINA                                   |');
	WScript.Echo('|              2 - LER O TIPO DA M\u00C1QUINA                                   |');
	WScript.Echo('|              3 - LER O TOTAL DE MEM\u00D3RIA                                  |');
	WScript.Echo('|              4 - LER O ESPA\u00C7O EM DISCO(S)                                |');
	WScript.Echo('|              5 - LER PROCESSOS QUE INICIAM AO LIGAR A M\u00C1QUINA            |');
	WScript.Echo('|              6 - LER PROCESSOS QUE EST\u00C3O RODANDO NO MOMENTO              |');
	WScript.Echo('|              7 - LER SERVI\u00C7OS QUE EST\u00C3O RODANDO NO MOMENTO          |');
	WScript.Echo('|              8 - LER AS INTERFACES DE REDE DA M\u00C1QUINA                    |');
	WScript.Echo('|              9 - Sair( DIGITE 9 OU Ctr + C)                                   |');
	WScript.Echo('|                                                                               |');
	WScript.Echo('+-------------------------------------------------------------------------------+');
}
do{ 
desenhaTela();
WScript.StdOut.Write("Escolha uma op\u00E7\u00E3o: ");
var OPCAO = WScript.StdIn.ReadLine();
switch(OPCAO){
	
	case '\u0031':
	  WScript.Echo ("Nome do computador: " +pcName());
	  WScript.StdOut.Write('Digite Enter para continuar');
	  WScript.StdIn.ReadLine();
	clearScreen();
	  break;
	
	case '\u0032':
	  WScript.Echo ("Tipo da M\u00E1quina: "+ tipoMaquina());
	  WScript.StdOut.Write('Digite Enter para continuar');
	  WScript.StdIn.ReadLine();
	  clearScreen();
	  break;

	case '\u0033':
	  WScript.Echo ("Total de Mem\u00F3ria e: "+ TotalMemoria()+"Mb");
	  WScript.StdOut.Write('Digite Enter para continuar');
	  WScript.StdIn.ReadLine();
	  clearScreen();
	  break;

	case '\u0034':
	  WScript.Echo ("O espaco usado em disco \u00E9: "+ hdinfo()+"%");
	  WScript.StdOut.Write('Digite Enter para continuar');
	  WScript.StdIn.ReadLine();
	  clearScreen();
	  break;

	case '\u0035':
	  WScript.Echo ("Pocessos que iniciam com a M\u00E1quina: "+ getStartup());
	  WScript.StdOut.Write('Digite Enter para continuar');
	  WScript.StdIn.ReadLine();
	  clearScreen();
	  break;  


	case '\u0036':
	  WScript.Echo ("Processos Abertos: "+ getProcesses());
	  WScript.StdOut.Write('Digite Enter para continuar');
	  WScript.StdIn.ReadLine();
	  clearScreen();
	  break;

	
	case '\u0037':
	  WScript.Echo ("Serviços Rodando: "+ getServices());
	  WScript.StdOut.Write('Digite Enter para continuar');
	  WScript.StdIn.ReadLine();
	  clearScreen();
	  break;

	case '\u0038':
	  WScript.Echo ("Interfaces : "+ getInterfaces());
	  WScript.StdOut.Write('Digite Enter para continuar');
	  WScript.StdIn.ReadLine();
	  clearScreen();
	  break;
	default:
	 
	  WScript.Echo("Op\u00E7\u00E3o Inv\u00E1lida!!");
	  WScript.Echo('Obrigado por utilizar nosso sistema!!!');
}    

}while(OPCAO != "\u0039");
