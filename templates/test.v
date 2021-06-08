<[ templates/sidebar.v ]>
<div class="block fullX collapse">
    <div style="position:relative;width:100%;height:calc(100vh - 55px);overflow:hidden">
        <xo-dragger>
            <xo-timer date="2022-01-01"></xo-timer>
        </xo-dragger>
        <xo-notifier title="hello there" body="just a test" icon="https://shahid4u.onl/1556124132.png" target="http://localhost:5050/IMS/#/switch"></xo-notifier>
        <xo-dragger>
            <xo-frame url="http://localhost:5050/IMS/#/slider"></xo-frame>
        </xo-dragger>
        <xo-dragger>
            <xo-video src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164" 
                style="display: block; margin: auto" silent loop></xo-video>
        </xo-dragger>
        <xo-dragger>
            <xo-audio src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164" 
                style="display: block; margin: auto" silent loop></xo-audio>
        </xo-dragger>
        <xo-dragger>
            <xo-dropdown style="margin: 0 calc(50% - 30px)" theme="bottom">
                <xo-icon icon="optionsHors" width="60px" height="60px" slot="trigger"></xo-icon>
                <div class="block backLight" style="width: 200px;gap: 5px;padding: 5px;">
                <xo-button class="fullX">hello there</xo-button>
                <xo-button class="fullX">hello there</xo-button>
                <xo-button class="fullX">hello there</xo-button>
                <xo-button class="fullX">hello there</xo-button>
                </div>
            </xo-dropdown>
        </xo-dragger>
        <xo-dragger>
            <xo-modal>
                <div class="block col-6 backLight" style="gap: 5px;">
                <xo-button class="fullX">hello there</xo-button>
                <xo-button class="fullX">hello there</xo-button>
                <xo-button class="fullX">hello there</xo-button>
                <xo-button class="fullX">hello there</xo-button>
                </div>
            </xo-modal>
        </xo-dragger>
	</div>
</div>