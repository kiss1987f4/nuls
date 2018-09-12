package io.nuls.contract.vm.instructions.math;

import io.nuls.contract.vm.Frame;
import io.nuls.contract.vm.util.Log;

public class Ushr {

    public static void iushr(final Frame frame) {
        int value2 = frame.operandStack.popInt();
        int value1 = frame.operandStack.popInt();
        int result = value1 >>> value2;
        frame.operandStack.pushInt(result);

        //Log.result(frame.getCurrentOpCode(), result, value1, ">>>", value2);
    }

    public static void lushr(final Frame frame) {
        int value2 = frame.operandStack.popInt();
        long value1 = frame.operandStack.popLong();
        long result = value1 >>> value2;
        frame.operandStack.pushLong(result);

        //Log.result(frame.getCurrentOpCode(), result, value1, ">>>", value2);
    }

}
