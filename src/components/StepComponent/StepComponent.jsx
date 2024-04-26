import { Steps } from 'antd'
import React from 'react'

const StepComponent = ({ current, items = [] }) => {
    const { Step } = Steps;
    return (
        <Steps labelPlacement="vertical" current={current}>
            {
                items.map((item) => {
                    return (
                        <Step key={item.title} title={item.title} description={item.description} />
                    )
                })
            }
        </Steps>
    )
}

export default StepComponent;