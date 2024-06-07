    window.watsonAssistantChatOptions = {
    integrationID: "0f4e033b-ebe0-43bf-b571-5ed6dbadb452", // The ID of this integration.
    region: "us-south", // The region your integration is hosted in.
    serviceInstanceID: "db7facb8-e7a2-4f69-9c99-45eb2c2bdfe0", // The ID of your service instance.
    onLoad: async (instance) => { await instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
