async function loadToolBox() {
    const manifest = chrome.runtime.getManifest();

    function closeToolBox() {
        document.getElementById("sb-main").style.display = "none";
    }

    function openToolBox() {
        document.getElementById("sb-main").style.display = "flex";
    }

    // Painel
    injectHtmlToPage(getContentFromHtml('/pages/main.html'), document.documentElement);

    // Switch screen icon.
    injectHtmlToPage(
        getContentFromHtml('/pages/open-main.html'),
        document.querySelector("header.l-header__main > div.container.u-flexbox.u-align-items-center.u-fill-height > div.l-header__content > div.l-header__actions > div.user-actions")
    );

    document.getElementById("sb-close").addEventListener('click', closeToolBox);
    document.getElementById("sb-icon").addEventListener('click',
        () => document.getElementById("sb-main").style.display == "none" ? openToolBox() : closeToolBox()
    );
    document.getElementById("sb-topbar").getElementsByTagName('span')[0].innerText = 'v' + manifest.version;
    
    const authorization = await getAuthorization();
    const user = await getUserData(authorization);
    fillToolBoxWithUserData(user);

}

function getAuthorization() {
    return new Promise((resolve, reject) => {
        const manifest = chrome.runtime.getManifest();
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        let authorization = {
            version: manifest.version,
            csrfToken: csrfToken,
        };

        chrome.runtime.sendMessage({ action: "getCookies", message: window.location.origin }, function (response) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                reject(chrome.runtime.lastError);
            } else {
                authorization.cookies = JSON.parse(response);
                authorization.token = authorization.cookies.filter(e => e.name == "_vinted_fr_session")[0].value;
                authorization.id = authorization.cookies.filter(e => e.name == "v_uid")[0].value;
                resolve(authorization);
            }
        });
    });
}

async function getUserData(authorization){
    let request = await makeRequest({
        method: "GET",
        url: API + "v1/user",
        data: {
            shop: "vinted",
            id: authorization.id,
            domain: window.location.origin,
            token: authorization.token,
            csrfToken: authorization.csrfToken,
        }
    });
    return request.response;
}

function fillToolBoxWithUserData(user) {
    let profile = document.getElementById("sb-profile-info");
    profile.querySelector("img").src = user.data.photo.url;
    profile.querySelector("section > h5").innerText = user.data.real_name;
    profile.querySelector("section > p:nth-child(2)").innerText = user.data.email;
    profile.querySelector("section > p:nth-child(3)").innerText = `#${user.data.id} - ${user.data.country_title}`;


    let details = document.getElementById("sb-details-info");
    details.querySelector("section:nth-child(1) > section > section:nth-child(2) > p").innerText = user.group.groupName;
    details.querySelector("section:nth-child(2) > section > section:nth-child(2) > p").innerText = `${user.actions.republishedTimes} - ${user.group.maxRepublish}`;
}

function ActionRepublish(){
    
}