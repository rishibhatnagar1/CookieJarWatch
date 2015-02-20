/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var flg = 0;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        navigator.notification.alert("Here",app.dummy,'Alert','OK');
        window.plugin.backgroundMode.enable();
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        $.ajax({
            url:"http://localhost:3000",
            type:'GET',
            success:app.recall
        })
        
    },
    recall:function(data){
        if(data==0){ // Out of Stock
            if(flg==1){
                flg=0;
            }
            $("#AlertList").hide();
            app.receivedEvent('again');
        }
        else if(data==1){ //One item in stock
            if(flg==0)
            {
            window.plugin.notification.local.add({ id:123, message: 'One Item Left on Shelf' });
            navigator.notification.beep(1);
            navigator.notification.alert('One Item left on shelf',app.dummy,'Alert','OK');
            window.plugin.notification.local.cancel({ id:123});
            flg = 1;
            }
            $("#AlertList").show();
            app.receivedEvent('again');
        }
    },

    dummy:function(){
    }
    
};
