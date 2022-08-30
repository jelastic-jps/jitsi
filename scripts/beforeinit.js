var resp, name, value, bandwidth_markup = "",
    BANDWIDTH_LIMIT = "network.bandwidth.limitation";
    q = jelastic.billing.account.GetQuotas(BANDWIDTH_LIMIT).array || [];

for (var i = 0, n = q.length; i < n; i++) {
    name = q[i].quota.name;
    value = q[i].value;
    
    if (name == BANDWIDTH_LIMIT) {
        if (value < 500) {
            bandwidth_markup = "Network bandwidth limitation quota is loo low for a Jitsi application. Please contact support.";
        } 
        continue;
    }
}

resp = { result: 0, settings: {fields: []} };

if (bandwidth_markup){
    resp.settings.fields.push(
        {"type": "displayfield", "cls": "warning", "height": 30, "hideLabel": true, "markup": bandwidth_markup},
        {"type": "compositefield","height": 0,"hideLabel": true,"width": 0,"items": [{"height": 0,"type": "string","required": true}]}
    )
}

return resp;
