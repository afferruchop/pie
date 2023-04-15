const { Schema , model } = require ('mongoose');

const eventSchema = new Schema({
                                  timestamp   : { type: Date, default: Date.now},
                                  flow_id     : String,
                                  pcap_cnt    : String,
                                  event_type  : String,
                                  src_ip      : String,
                                  src_port    : String,
                                  dest_ip     : String,
                                  dest_port   : String,
                                  proto       : String,
                                  http        : {
                                    hostname : { type: String, default: "N/A"},
                                    url : String,
                                    http_user_agent : { type: String, default: "N/A"},
                                    http_content_type : String,
                                    http_method : String,
                                    protocol : String,
                                    status : String,
                                    length : String
                                  },
                                  app_proto   : String,
                                  flow        : {
                                                  pkts_toserver : String,
                                                  pkts_toclient : String,
                                                  bytes_toserver : String,
                                                  bytes_toclient : String,
                                                  start : String
                                                },
                                  tx_id       : { type: String, default: 0},
                                  alert       : {
                                    action : String,
                                    gid : String,
                                    signature_id : String,
                                    rev : String,
                                    signature : String,
                                    category : String,
                                    severity : String
                                  },
                                })

module.exports = model('Evento', eventSchema);