<[ templates/sidebar.v ]>
<div class="block">
    <div class="col-12">
        <section>
            <div class="col-12">
                <h1 class="header-4">Range</h1>
            </div>
            <div class="col-12">
                <div class="block" style="gap: 10px">
                    <xo-range @input="this.nextElementSibling.innerText = 'Value: ' + this.value;"></xo-range>
                    <label>Value: 0</label>
                    <xo-range theme="water"></xo-range>
                    <xo-range theme="fire"></xo-range>
                    <xo-range theme="earth"></xo-range>
                    <xo-range theme="forest"></xo-range>
                    <xo-range theme="night"></xo-range>
                </div>
            </div>
            <div class="col-12">
                <div class="col-12 lgPadding-0 back padding-4">
                    &lt;xo-range&gt;&lt;/xo-range&gt;</br>
                    &lt;xo-range theme="water"&gt;&lt;/xo-range&gt;</br>
                    &lt;xo-range theme="fire"&gt;&lt;/xo-range&gt;</br>
                    &lt;xo-range theme="earth"&gt;&lt;/xo-range&gt;</br>
                    &lt;xo-range theme="forest"&gt;&lt;/xo-range&gt;</br>
                    &lt;xo-range theme="night"&gt;&lt;/xo-range&gt;
                </div>
            </div>
        </section>
        <section>
            <div class="col-12">
                <h1 class="header-4">Rate</h1>
            </div>
            <div class="col-12">
                <div class="block" style="gap: 10px">
                    <xo-rate style="width: 100%" count="20" value="5"></xo-rate>
                    <xo-rate style="width: 100%" theme="water" count="20"></xo-rate>
                    <xo-rate style="width: 100%" theme="fire" count="20"></xo-rate>
                    <xo-rate style="width: 100%" theme="earth" count="20"></xo-rate>
                    <xo-rate style="width: 100%" theme="forest" count="20"></xo-rate>
                    <xo-rate style="width: 100%" theme="night" count="20"></xo-rate>
                </div>
            </div>
            <div class="col-12">
                <div class="col-12 lgPadding-0 back padding-4">
                    &lt;xo-rate count="10" value="5" &gt;&lt;/xo-rate&gt;</br>
                    &lt;xo-rate count="10"  theme="water"&gt;&lt;/xo-rate&gt;</br>
                    &lt;xo-rate count="10"  theme="fire"&gt;&lt;/xo-rate&gt;</br>
                    &lt;xo-rate count="10"  theme="earth"&gt;&lt;/xo-rate&gt;</br>
                    &lt;xo-rate count="10"  theme="forest"&gt;&lt;/xo-rate&gt;</br>
                    &lt;xo-rate count="10"  theme="night"&gt;&lt;/xo-rate&gt;
                </div>
            </div>
        </section>
    </div>
</div>