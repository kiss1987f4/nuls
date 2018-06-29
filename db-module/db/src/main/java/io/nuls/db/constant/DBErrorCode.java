/*
 * *
 *  * MIT License
 *  *
 *  * Copyright (c) 2017-2018 nuls.io
 *  *
 *  * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  * of this software and associated documentation files (the "Software"), to deal
 *  * in the Software without restriction, including without limitation the rights
 *  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  * copies of the Software, and to permit persons to whom the Software is
 *  * furnished to do so, subject to the following conditions:
 *  *
 *  * The above copyright notice and this permission notice shall be included in all
 *  * copies or substantial portions of the Software.
 *  *
 *  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  * SOFTWARE.
 *
 */

package io.nuls.db.constant;

import io.nuls.kernel.constant.ErrorCode;
import io.nuls.kernel.constant.KernelErrorCode;

/**
 * @desription:
 * @author: PierreLuo
 */
public interface DBErrorCode extends KernelErrorCode {

    ErrorCode DB_AREA_EXIST = ErrorCode.init("DB001", "20009");
    ErrorCode DB_AREA_NOT_EXIST = ErrorCode.init("DB002", "20010");

    ErrorCode DB_AREA_CREATE_EXCEED_LIMIT = ErrorCode.init("DB003", "20011");
    ErrorCode DB_AREA_CREATE_ERROR = ErrorCode.init("DB004", "20012");
    ErrorCode DB_AREA_CREATE_PATH_ERROR = ErrorCode.init("DB005", "20013");
    ErrorCode DB_AREA_DESTROY_ERROR = ErrorCode.init("DB006", "20014");
    ErrorCode DB_BATCH_CLOSE = ErrorCode.init("DB007", "20015");
}