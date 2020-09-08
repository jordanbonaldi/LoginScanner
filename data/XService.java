/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

package net.neferett.webviewsinjector.services;

import android.content.Context;
import net.neferett.webviewsinjector.R;
import net.neferett.webviewsinjector.javascript.ElementValue;
import net.neferett.webviewsinjector.login.StepEnum;
import net.neferett.webviewsinjector.login.TypesAuthElement;
import net.neferett.webviewsinjector.response.ResponseEnum;
import net.neferett.webviewsinjector.services.LoginService;

import java.util.HashMap;

public class %sv%Service extends LoginService {

    /**
     *
     * @param context Main Activity Context
     */
    public %sv%Service(Context context) {
        super("%sv%", StepEnum.ONE_STEP, context, "%url%", 3, null, false);
    }

    /**
     *
     * @param element TypesAuth Button
     */
    private void defineButton(TypesAuthElement element) {
        this.step.addElement(element, this.constructElementValue("%querysubmit%", "%submit%"));
    }

    public void constructElementValue(String key, String value) {
        return new ElementValue(
            key, value, key.contains("s")
        ))
    }

    @Override
    public void setupElements() {
        this.step.addElement(TypesAuthElement.USERNAME, this.constructElementValue("%queryusername%", "%username%"));
        this.step.addElement(TypesAuthElement.PASSWORD, this.constructElementValue("%querypassword%", "%password%"));

        this.defineButton(TypesAuthElement.BUTTON_LOGIN);
        this.defineButton(TypesAuthElement.BUTTON_PASSWORD);
    }

    /**
     *
     * @return ResponseEnum and Linked JavaScript code
     */
    @Override
    protected HashMap<ResponseEnum, String> setupTests() {
        return new HashMap<ResponseEnum, String>(){{
            put(ResponseEnum.FINAL_EQUALS_URL, "%final_url%");
        }};
    }
}
