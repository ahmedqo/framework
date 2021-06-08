<[ templates/nav.v ]>
<div class="block fullX contentCenterX itemsCenter cover">
    <div class="col-12">
        <section>
            <div class="col-6 lgCol-8 mdCol-10 smCol-12" style="margin: auto">
                <h1 class="header-4 mdHeader-5 textCenter marginBottom-4 textLight">Sign In</h1>
                <div class="block contentEndX radius-6 backLight padding-5">
                    <div class="col-12 marginBottom-5">
                        <xo-textbox id="username" class="fullX" placeholder="Username">
                            <xo-icon icon="person" width="24px" height="24px" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-textbox>
                    </div>
                    <div class="col-12 marginBottom-5">
                        <xo-password id="password" class="fullX" placeholder="Password">
                            <xo-icon icon="lock" width="24px" height="24px" slot="prefix" style="margin-left: 8px"></xo-icon>
                        </xo-password>
                    </div>
                    <div class="colMax">
                        <xo-button class="fullX" theme="water" @click="spa.send('/accordion');">
                            Sign In
                            <xo-icon icon="signIn" width="30px" height="30px" color="#fff" slot="prefix"></xo-icon>
                        </xo-button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>