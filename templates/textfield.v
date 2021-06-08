<[ templates/sidebar.v ]>
<div class="block">
    <div class="col-12">
        <section>
            <div class="block" style="gap: 10px">
                <xo-textbox value="ahmed qoreichi" placeholder="text input"></xo-textbox>
                <xo-password value="ahmed qoreichi" placeholder="text input" blocked></xo-password>
                <xo-textarea value="ahmed qoreichi" placeholder="text input"></xo-textarea>
                <xo-select placeholder="text input">
                    <xo-select-item value="0" selected>Hello there 0</xo-select-item>
                    <xo-select-item value="1">Hello there 1</xo-select-item>
                </xo-select>
                <$ assign date =  new Date().getFullYear() + "-" +  (new Date().getMonth() + 1) + "-" + new Date().getDate()  $>
                <xo-calendar value="<{ date }>" placeholder="text input"></xo-calendar>
                <$ assign time =  new Date().getHours() + ":" +  new Date().getMinutes() + ":" + new Date().getSeconds()  $>
                <xo-time value="<{ time }>" placeholder="text input"></xo-time>
                <xo-file placeholder="text input"></xo-file>
                <xo-color value="#ffffff" placeholder="text input"></xo-color>
            </div>
        </section>
        
        <section>
            <div class="col-12">
                <h1 class="header-4">TextBox</h1>
            </div>
            <div class="col-12">
                <div class="block" style="gap: 10px">
                    <xo-textbox value="ahmed qoreichi" placeholder="text input"></xo-textbox>
                    <xo-textbox placeholder="text input">
                        <xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"></xo-icon>
                    </xo-textbox>
                    <xo-textbox placeholder="text input">
                        <xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"></xo-icon>
                        <xo-icon icon="person" width="20px" height="20px" slot="suffix" style="margin-right: 5px"></xo-icon>
                    </xo-textbox>
                </div>
            </div>
            <div class="col-12">
                <div class="col-12 lgPadding-0 back padding-4">
                    &lt;xo-textbox placeholder="text input"&gt;&lt;/xo-textbox&gt;</br>
                    &lt;xo-textbox placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"&gt;&lt;/xo-icon&gt;
                    </div>
                    &lt;/xo-textbox&gt;</br>
                    &lt;xo-textbox placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"&gt;&lt;/xo-icon&gt;</br>
                        &lt;xo-icon icon="person" width="20px" height="20px" slot="suffix" style="margin-right: 5px"&gt;&lt;/xo-icon&gt;
                    </div>
                    &lt;/xo-textbox&gt;
                </div>
            </div>
        </section>
        
        <section>
            <div class="col-12">
                <h1 class="header-4">TextArea</h1>
            </div>
            <div class="col-12">
                <div class="block" style="gap: 10px">
                    <xo-textarea value="ahmed qoreichi" placeholder="text input"></xo-textarea>
                    <xo-textarea placeholder="text input">
                        <xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"></xo-icon>
                    </xo-textarea>
                    <xo-textarea placeholder="text input">
                        <xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"></xo-icon>
                        <xo-icon icon="person" width="20px" height="20px" slot="suffix" style="margin-right: 5px"></xo-icon>
                    </xo-textarea>
                </div>
            </div>
            <div class="col-12">
                <div class="col-12 lgPadding-0 back padding-4">
                    &lt;xo-textarea placeholder="text input"&gt;&lt;/xo-textarea&gt;</br>
                    &lt;xo-textarea placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"&gt;&lt;/xo-icon&gt;
                    </div>
                    &lt;/xo-textarea&gt;</br>
                    &lt;xo-textarea placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"&gt;&lt;/xo-icon&gt;</br>
                        &lt;xo-icon icon="person" width="20px" height="20px" slot="suffix" style="margin-right: 5px"&gt;&lt;/xo-icon&gt;
                    </div>
                    &lt;/xo-textarea&gt;
                </div>
            </div>
        </section>

        <section>
            <div class="col-12">
                <h1 class="header-4">PassWord</h1>
            </div>
            <div class="col-12">
                <div class="block" style="gap: 10px">
                    <xo-password value="ahmed qoreichi" placeholder="text input"></xo-password>
                    <xo-password placeholder="text input">
                        <xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"></xo-icon>
                    </xo-password>
                </div>
            </div>
            <div class="col-12">
                <div class="col-12 lgPadding-0 back padding-4">
                    &lt;xo-password placeholder="text input"&gt;&lt;/xo-password&gt;</br>
                    &lt;xo-password placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"&gt;&lt;/xo-icon&gt;
                    </div>
                    &lt;/xo-password&gt;
                </div>
            </div>
        </section>

        <section>
            <div class="col-12">
                <h1 class="header-4">Select</h1>
            </div>
            <div class="col-12">
                <div class="block" style="gap: 10px">
                    <xo-select placeholder="text input">
                        <xo-select-item value="0" selected>Hello there 0</xo-select-item>
                        <xo-select-item value="1">Hello there 1</xo-select-item>
                        <xo-select-item value="2">Hello there 2</xo-select-item>
                        <xo-select-item value="3">Hello there 3</xo-select-item>
                        <xo-select-item value="4">Hello there 4</xo-select-item>
                        <xo-select-item value="5">Hello there 5</xo-select-item>
                        <xo-select-item value="6">Hello there 6</xo-select-item>
                        <xo-select-item value="7">Hello there 7</xo-select-item>
                        <xo-select-item value="8">Hello there 8</xo-select-item>
                        <xo-select-item value="9">Hello there 9</xo-select-item>
                    </xo-select>
                    <xo-select theme="water" placeholder="text input">
                        <xo-select-item value="0">Hello there 0</xo-select-item>
                        <xo-select-item value="1">Hello there 1</xo-select-item>
                    </xo-select>
                    <xo-select theme="fire" placeholder="text input">
                        <xo-select-item value="0">Hello there 0</xo-select-item>
                        <xo-select-item value="1">Hello there 1</xo-select-item>
                    </xo-select>
                    <xo-select theme="earth" placeholder="text input">
                        <xo-select-item value="0">Hello there 0</xo-select-item>
                        <xo-select-item value="1">Hello there 1</xo-select-item>
                    </xo-select>
                    <xo-select theme="forest" placeholder="text input">
                        <xo-select-item value="0">Hello there 0</xo-select-item>
                        <xo-select-item value="1">Hello there 1</xo-select-item>
                    </xo-select>
                    <xo-select theme="night" placeholder="text input">
                        <xo-select-item value="0">Hello there 0</xo-select-item>
                        <xo-select-item value="1">Hello there 1</xo-select-item>
                    </xo-select>
                    <xo-select placeholder="text input">
                        <xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"></xo-icon>
                        <xo-select-item value="0">Hello there 0</xo-select-item>
                        <xo-select-item value="1">Hello there 1</xo-select-item>
                    </xo-select>
                </div>
            </div>
            <div class="col-12">
                <div class="col-12 lgPadding-0 back padding-4">
                    &lt;xo-select placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-select-item value="0"&lt;Hello there&lt;/xo-select-item&gt;</br>
                        &lt;xo-select-item value="1"&lt;Hello there&lt;/xo-select-item&gt;
                    </div>
                    &lt;/xo-select&gt;</br>
                    &lt;xo-select theme="water" placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-select-item value="0"&lt;Hello there&lt;/xo-select-item&gt;</br>
                        &lt;xo-select-item value="1"&lt;Hello there&lt;/xo-select-item&gt;
                    </div>
                    &lt;/xo-select&gt;</br>
                    &lt;xo-select theme="fire" placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-select-item value="0"&lt;Hello there&lt;/xo-select-item&gt;</br>
                        &lt;xo-select-item value="1"&lt;Hello there&lt;/xo-select-item&gt;
                    </div>
                    &lt;/xo-select&gt;</br>
                    &lt;xo-select theme="earth" placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-select-item value="0"&lt;Hello there&lt;/xo-select-item&gt;</br>
                        &lt;xo-select-item value="1"&lt;Hello there&lt;/xo-select-item&gt;
                    </div>
                    &lt;/xo-select&gt;</br>
                    &lt;xo-select theme="forest" placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-select-item value="0"&lt;Hello there&lt;/xo-select-item&gt;</br>
                        &lt;xo-select-item value="1"&lt;Hello there&lt;/xo-select-item&gt;
                    </div>
                    &lt;/xo-select&gt;</br>
                    &lt;xo-select theme="night" placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-select-item value="0"&lt;Hello there&lt;/xo-select-item&gt;</br>
                        &lt;xo-select-item value="1"&lt;Hello there&lt;/xo-select-item&gt;
                    </div>
                    &lt;/xo-select&gt;</br>
                    &lt;xo-select placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"&gt;&lt;/xo-icon&lt;</br>
                        &lt;xo-select-item value="0"&lt;Hello there&lt;/xo-select-item&gt;</br>
                        &lt;xo-select-item value="1"&lt;Hello there&lt;/xo-select-item&gt;
                    </div>
                    &lt;/xo-select&gt;
                </div>
            </div>
        </section>

        <section>
            <div class="col-12">
                <h1 class="header-4">calendar</h1>
            </div>
            <div class="col-12">
                <div class="block" style="gap: 10px">
                    <xo-calendar value="2021-1-26" placeholder="text input"></xo-calendar>
                    <xo-calendar theme="water" placeholder="text input"></xo-calendar>
                    <xo-calendar theme="fire" placeholder="text input"></xo-calendar>
                    <xo-calendar theme="earth" placeholder="text input"></xo-calendar>
                    <xo-calendar theme="forest" placeholder="text input"></xo-calendar>
                    <xo-calendar theme="night" placeholder="text input"></xo-calendar>
                    <xo-calendar placeholder="text input">
                        <xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"></xo-icon>
                    </xo-calendar>
                </div>
            </div>
            <div class="col-12">
                &lt;xo-calendar placeholder="text input"&gt;&lt;/xo-calendar&gt;</br>
                &lt;xo-calendar theme="water" placeholder="text input"&gt;&lt;/xo-calendar&gt;</br>
                &lt;xo-calendar theme="fire" placeholder="text input"&gt;&lt;/xo-calendar&gt;</br>
                &lt;xo-calendar theme="earth" placeholder="text input"&gt;&lt;/xo-calendar&gt;</br>
                &lt;xo-calendar theme="forest" placeholder="text input"&gt;&lt;/xo-calendar&gt;</br>
                &lt;xo-calendar theme="night" placeholder="text input"&gt;&lt;/xo-calendar&gt;</br>
                &lt;xo-calendar placeholder="text input"&gt;
                <div class="paddingLeft-4">
                    &lt;xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"&gt;&lt;/xo-icon&lt;</br>
                </div>
                &lt;/xo-calendar&gt;
            </div>
        </section>

        <section>
            <div class="col-12">
                <h1 class="header-4">Time</h1>
            </div>
            <div class="col-12">
                <div class="block" style="gap: 10px">
                    <xo-time value="10:10:00" placeholder="text input"></xo-time>
                    <xo-time theme="water" placeholder="text input"></xo-time>
                    <xo-time theme="fire" placeholder="text input"></xo-time>
                    <xo-time theme="earth" placeholder="text input"></xo-time>
                    <xo-time theme="forest" placeholder="text input"></xo-time>
                    <xo-time theme="night" placeholder="text input"></xo-time>
                    <xo-time placeholder="text input">
                        <xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"></xo-icon>
                    </xo-time>
                </div>
            </div>
            <div class="col-12">
                <div class="col-12 lgPadding-0 back padding-4">
                    &lt;xo-time placeholder="text input"&gt;&lt;/xo-time&gt;</br>
                    &lt;xo-time theme="water" placeholder="text input"&gt;&lt;/xo-time&gt;</br>
                    &lt;xo-time theme="fire" placeholder="text input"&gt;&lt;/xo-time&gt;</br>
                    &lt;xo-time theme="earth" placeholder="text input"&gt;&lt;/xo-time&gt;</br>
                    &lt;xo-time theme="forest" placeholder="text input"&gt;&lt;/xo-time&gt;</br>
                    &lt;xo-time theme="night" placeholder="text input"&gt;&lt;/xo-time&gt;</br>
                    &lt;xo-time placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"&gt;&lt;/xo-icon&lt;</br>
                    </div>
                    &lt;/xo-time&gt;
                </div>
            </div>
        </section>

        <section>
            <div class="col-12">
                <h1 class="header-4">File</h1>
            </div>
            <div class="col-12">
                <div class="block" style="gap: 10px">
                    <xo-file placeholder="text input"></xo-file>
                    <xo-file @active="console.log(event.detail)" theme="water" placeholder="text input"></xo-file>
                    <xo-file theme="fire" placeholder="text input"></xo-file>
                    <xo-file theme="earth" placeholder="text input"></xo-file>
                    <xo-file theme="forest" placeholder="text input"></xo-file>
                    <xo-file theme="night" placeholder="text input"></xo-file>
                    <xo-file placeholder="text input">
                        <xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"></xo-icon>
                    </xo-file>            
                </div>
            </div>
            <div class="col-12">
                <div class="col-12 lgPadding-0 back padding-4">
                    &lt;xo-file placeholder="text input"&gt;&lt;/xo-file&gt;</br>
                    &lt;xo-file theme="water" placeholder="text input"&gt;&lt;/xo-file&gt;</br>
                    &lt;xo-file theme="fire" placeholder="text input"&gt;&lt;/xo-file&gt;</br>
                    &lt;xo-file theme="earth" placeholder="text input"&gt;&lt;/xo-file&gt;</br>
                    &lt;xo-file theme="forest" placeholder="text input"&gt;&lt;/xo-file&gt;</br>
                    &lt;xo-file theme="night" placeholder="text input"&gt;&lt;/xo-file&gt;</br>
                    &lt;xo-file placeholder="text input"&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"&gt;&lt;/xo-icon&lt;</br>
                    </div>
                    &lt;/xo-file&gt;
                </div>
            </div>
        </section>

        <section>
            <div class="col-12">
                <h1 class="header-4">Color</h1>
            </div>
            <div class="col-12">
                <div class="block" style="gap: 10px">
                    <xo-color value="white" placeholder="text input"></xo-color>
                    <xo-color placeholder="text input">
                        <xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"></xo-icon>
                    </xo-color>
                </div>
            </div>
            <div class="col-12">
                <div class="col-12 lgPadding-0 back padding-4">
                    &lt;xo-color&gt;&lt;/xo-color&gt;</br>
                    &lt;xo-color&gt;
                    <div class="paddingLeft-4">
                        &lt;xo-icon icon="person" width="20px" height="20px" slot="prefix" style="margin-left: 5px"&gt;&lt;/xo-icon&gt;
                    </div>
                    &lt;/xo-color&gt;
                </div>
            </div>
        </section>
    </div>
</div>