const event = {};

const Eventos = require ('../models/eventos');

event.getEvent = async (req, res) => {
    
    const eventos = await Eventos.find();

    console.log("Se encontron ", eventos.length);
    console.log("Los eventos encontrados son", eventos);
    res.json({mesage: "Encontro " +eventos.length +" eventos registrados", result : eventos});
}

event.getEventParam = async (req, res) => {
    
    let parametro = req.params.param;

    var campo = parametro.split('=');
    var searchIn = campo[0];
    var retorno = [];

    const eventos = await Eventos.find();

    eventos.map((element) =>{
        if(element[searchIn] == campo[1])
        {
            retorno.push(element);
        }
        console.log("Elemento", element);
    });
    //console.log("Se encontron ", eventos.length);
    //console.log("Los eventos encontrados son", eventos);
    res.json({mesage: "Se consulto el parametro " + campo[0] + " = " + campo[1], result : retorno});
}

event.createEvent = async (req, res) => {
    
  console.log("Evento recibido", req.body);
  let mensaje;
  let esJSON = false;
  try {
    JSON.parse(req.body);
    esJSON = true;
  } catch (error) {
    console.error("El objeto no es un JSON válido:", error.message);
  }

  if(esJSON)
  {
    console.log("El objeto es un JSON válido");

    var flow_id = 'flow_id' in req.body ? req.body.flow_id : 'N/A';
    var pcap_cnt = 'pcap_cnt' in req.body ? req.body.pcap_cnt : 'N/A';
    var event_type = 'event_type' in req.body ? req.body.event_type : 'N/A';
    var src_ip = 'src_ip' in req.body ? req.body.src_ip : 'N/A';
    var src_port = 'src_port' in req.body ? req.body.src_port : 'N/A';
    var dest_ip = 'dest_ip' in req.body ? req.body.dest_ip : 'N/A';
    var dest_port = 'dest_port' in req.body ? req.body.dest_port : 'N/A';
    var proto = 'proto' in req.body ? req.body.proto : 'N/A';
    var tx_id = 'tx_id' in req.body ? req.body.tx_id : 'N/A';
    var action  = 'alert.action ' in req.body ?  req.body.alert.action  : 'N/A';
    var gid = 'alert.gid' in req.body ? req.body.alert.gid : 'N/A';
    var signature_id  = 'alert.signature_id ' in req.body ?  req.body.alert.signature_id  : 'N/A';
    var rev  = 'alert.rev ' in req.body ?  req.body.alert.rev  : 'N/A';
    var signature  = 'alert.signature ' in req.body ?  req.body.alert.signature  : 'N/A';
    var category  = 'alert.category ' in req.body ?  req.body.alert.category  : 'N/A';
    var severity  = 'alert.severity ' in req.body ?  req.body.alert.severity  : 'N/A';
    var hostname = 'http.hostname' in req.body ? req.body.http.hostname : 'N/A';
    var url = 'http.url' in req.body ? req.body.http.url : 'N/A';
    var http_user_agent = 'http.http_user_agent' in req.body ? req.body.http.http_user_agent : 'N/A';
    var http_content_type = 'http.http_content_type' in req.body ? req.body.http.http_content_type : 'N/A';
    var http_method = 'http.http_method' in req.body ? req.body.http.http_method : 'N/A';
    var protocol = 'http.protocol' in req.body ? req.body.http.protocol : 'N/A';
    var status = 'http.status' in req.body ? req.body.http.status : 'N/A';
    var length = 'http.length' in req.body ? req.body.http.length : 'N/A';
    var app_proto = 'app_proto' in req.body ? req.body.app_proto : 'N/A';
    var pkts_toserver = 'flow.pkts_toserver' in req.body ? req.body.flow.pkts_toserver : 'N/A';
    var pkts_toclient = 'flow.pkts_toclient' in req.body ? req.body.flow.pkts_toclient : 'N/A';
    var bytes_toserver = 'flow.bytes_toserver' in req.body ? req.body.flow.bytes_toserver : 'N/A';
    var bytes_toclient = 'flow.bytes_toclient' in req.body ? req.body.flow.bytes_toclient : 'N/A';
    var start = 'flow.start' in req.body ? req.body.flow.start : 'N/A';
    
    const newEvento = new Eventos({
      flow_id     : flow_id ,
      pcap_cnt    : pcap_cnt,
      event_type  : event_type,
      src_ip      : src_ip,
      src_port    : src_port,
      dest_ip     : dest_ip,
      dest_port   : dest_port,
      proto       : proto,
      tx_id       : tx_id,
      alert       : {
                      action : action ,
                      gid : gid,
                      signature_id : signature_id ,
                      rev : rev ,
                      signature : signature ,
                      category : category ,
                      severity : severity 
                  },
      http        : {
                      hostname : hostname,
                      url : url,
                      http_user_agent : http_user_agent,
                      http_content_type : http_content_type,
                      http_method : http_method,
                      protocol : protocol,
                      status : status,
                      length : length
                  },
      app_proto   : app_proto,
      flow        : {
                      pkts_toserver : pkts_toserver,
                      pkts_toclient : pkts_toclient,
                      bytes_toserver : bytes_toserver,
                      bytes_toclient : bytes_toclient,
                      start : start
                  }
    });

    console.log(newEvento);
    mensaje = "Se inserto ", newEvento;
    await newEvento.save();
  }
  else
  {
    console.log("No se inserto evento");
    mensaje = "No se inserto evento";
  }


  res.json({mesage: mensaje});
}

module.exports =  event;