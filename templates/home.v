
<[ templates/nav.v ]>

<div class="block">
    <div class="col-12">
        <div class="block lgPadding-6">
            <div class="mdCol-12 lgCol-4 col-3">
                <img class="border-1 borderDark borderSolid" src="storage/face.jpg" width="100%" style="display: block">
            </div>
            <div class="mdCol-12 lgCol-8 col-9 padding-0">
                <div id="display" class="block contentEndX itemsCenter">
                    <div class="col-10">
                        <h1 class="header-6">Personal Informations :</h1>
                    </div>
                    <div class="col-2">
                        <xo-button class="fullX" theme="water" @click="
                            var list = ['firstname','lastname','birth','nationality','address','city','zipcode','country','email','phone','bio'];
                            display.querySelectorAll('.databox').forEach((e,i)=>{
                                if(e.matches('[read]')) {
                                    e.removeAttribute('read');  
                                    this.setAttribute('theme','forest');
                                    this.querySelector('xo-icon').icon = 'save';
                                } else {
                                    e.setAttribute('read','');
                                    XO.storage(list[i], e.value);
                                    this.setAttribute('theme','water');
                                    this.querySelector('xo-icon').icon = 'pen';
                                };
                            });
                        " pill>
                            <xo-icon icon="pen" width="30" height="30" color="#fff" slot="prefix"></xo-icon>
                        </xo-button>
                    </div>
                    <div class="mdCol-12 col-6">
                        <xo-textbox id="firstname" class="fullX databox" placeholder="First Name" value="<{name.first}>" read>
                            <xo-icon icon="person" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textbox>
                    </div>
                    <div class="mdCol-12 col-6">
                        <xo-textbox id="lastname" class="fullX databox" placeholder="Last Name" value="<{name.last}>" read>
                            <xo-icon icon="person" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textbox>
                    </div>
                    <div class="mdCol-12 col-6">
                        <xo-textbox id="birth" class="fullX databox" placeholder="Birth Date" value="<{birth}>" read>
                            <xo-icon icon="calendar" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textbox>
                    </div>
                    <div class="mdCol-12 col-6">
                        <xo-textbox id="nationality" class="fullX databox" placeholder="Nationality" value="<{nationality}>" read>
                            <xo-icon icon="globe" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textbox>
                    </div>
                    <div class="mdCol-12 col-12">
                        <xo-textbox id="address" class="fullX databox" placeholder="Address" value="<{local.address}>" read>
                            <xo-icon icon="pin" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textbox>
                    </div>
                    <div class="mdCol-12 col-4">
                        <xo-textbox id="city" class="fullX databox" placeholder="City" value="<{local.city}>" read>
                            <xo-icon icon="home" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textbox>
                    </div>
                    <div class="mdCol-12 col-4">
                        <xo-textbox id="zipcode" class="fullX databox" placeholder="Zip Code" value="<{local.zipcode}>" read>
                            <xo-icon icon="mapMarker" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textbox>
                    </div>
                    <div class="mdCol-12 col-4">
                        <xo-textbox id="country" class="fullX databox" placeholder="Country" value="<{local.country}>" read>
                            <xo-icon icon="flag" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textbox>
                    </div>
                    <div class="mdCol-12 col-6">
                        <xo-textbox id="email" class="fullX databox" placeholder="Email" value="<{email}>" read>
                            <xo-icon icon="mail" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textbox>
                    </div>
                    <div class="mdCol-12 col-6">
                        <xo-textbox id="phone" class="fullX databox" placeholder="Phone" value="<{phone}>" read>
                            <xo-icon icon="phone" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textbox>
                    </div>
                    <div class="mdCol-12 col-12">
                        <xo-textarea id="bio" class="fullX databox" placeholder="Bio" value="<{bio}>" read>
                            <xo-icon icon="clipBoard" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="block lgPadding-6">
            <div class="mdCol-12 col-4">
                <xo-textbox id="firstname" class="fullX databox" placeholder="First Name" value="<{name.first}>" read>
                    <xo-icon icon="person" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                </xo-textbox>
            </div>
            <div class="smCol-12 mdCol-6 col-4">
                <xo-textbox id="firstname" class="fullX databox" placeholder="First Name" value="<{name.first}>" read>
                    <xo-icon icon="person" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                </xo-textbox>
            </div>
            <div class="smCol-12 mdCol-6 col-4">
                <xo-textbox id="firstname" class="fullX databox" placeholder="First Name" value="<{name.first}>" read>
                    <xo-icon icon="person" width="30" height="30" slot="prefix" style="margin-left: 8px"></xo-icon>
                </xo-textbox>
            </div>
        </div>
    </div>
</div>