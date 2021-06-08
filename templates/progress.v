<[ templates/sidebar.v ]>
<div class="block">
    <div class="col-12">
        <section>
            <div class="col-12">
                <h1 class="header-4">Progress</h1>
            </div>
            <div class="col-12">
                <div class="block" style="gap: 10px">
                    <xo-progress @load="setInterval(()=>{ if(Number(this.value) <= 100) this.value = Number(this.value) + 1 },500)"></xo-progress>
                    <xo-progress @load="setInterval(()=>{ if(Number(this.value) <= 100) this.value = Number(this.value) + 1 },500)" theme="water"></xo-progress>
                    <xo-progress @load="setInterval(()=>{ if(Number(this.value) <= 100) this.value = Number(this.value) + 1 },500)" theme="fire"></xo-progress>
                    <xo-progress @load="setInterval(()=>{ if(Number(this.value) <= 100) this.value = Number(this.value) + 1 },500)" theme="earth"></xo-progress>
                    <xo-progress @load="setInterval(()=>{ if(Number(this.value) <= 100) this.value = Number(this.value) + 1 },500)" theme="forest"></xo-progress>
                    <xo-progress @load="setInterval(()=>{ if(Number(this.value) <= 100) this.value = Number(this.value) + 1 },500)" theme="night"></xo-progress>
                </div>
            </div>
            <div class="col-12">
                <div class="col-12 lgPadding-0 back padding-4">
                    &lt;xo-progress&gt;&lt;/xo-progress&gt;</br>
                    &lt;xo-progress theme="water"&gt;&lt;/xo-progress&gt;</br>
                    &lt;xo-progress theme="fire"&gt;&lt;/xo-progress&gt;</br>
                    &lt;xo-progress theme="earth"&gt;&lt;/xo-progress&gt;</br>
                    &lt;xo-progress theme="forest"&gt;&lt;/xo-progress&gt;</br>
                     &lt;xo-progress theme="night"&gt;&lt;/xo-progress&gt;
                </div>
            </div>
        </section>
    </div>
</div>