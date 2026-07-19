(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var bg3 = style.getPropertyValue('--bg3').trim();
  var success = style.getPropertyValue('--success').trim();
  var warning = style.getPropertyValue('--warning').trim();
  var danger = style.getPropertyValue('--danger').trim();

  // === 图 1: 标准测试角色混合权重熵对比 ===
  var chart1 = echarts.init(document.getElementById('chart-entropy'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      appendToBody: true,
      backgroundColor: bg3,
      borderColor: rule,
      textStyle: { color: ink }
    },
    grid: { left: '8%', right: '5%', bottom: '15%', top: '15%' },
    legend: {
      data: ['混合权重熵', '关节外率(%)'],
      textStyle: { color: muted },
      top: 5
    },
    xAxis: {
      type: 'category',
      data: ['ninja', 'ironman', 'messi', 'obama', 'spiderman', 'luigi', 'smplx', 'bunny', '3DGS'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, rotate: 30, fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: '熵',
        nameTextStyle: { color: muted },
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      {
        type: 'value',
        name: '关节外率(%)',
        nameTextStyle: { color: muted },
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, formatter: '{value}%' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '混合权重熵',
        type: 'bar',
        data: [2.60, 0.626, 0.848, 0.839, 0.528, 0.668, 0.346, 0.784, 0.437],
        itemStyle: {
          color: function(params) {
            return params.dataIndex === 0 ? warning : accent;
          }
        },
        barWidth: '40%'
      },
      {
        name: '关节外率(%)',
        type: 'line',
        yAxisIndex: 1,
        data: [76.9, 0, 0, 0, 0, 0, 0, 0, 0],
        lineStyle: { color: danger, width: 2 },
        itemStyle: { color: danger },
        symbol: 'circle',
        symbolSize: 8
      }
    ]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // === 图 2: 各测试类别成功率分布 ===
  var chart2 = echarts.init(document.getElementById('chart-category'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      appendToBody: true,
      backgroundColor: bg3,
      borderColor: rule,
      textStyle: { color: ink }
    },
    legend: {
      data: ['成功', '降级/警告', '失败'],
      textStyle: { color: muted },
      top: 5
    },
    grid: { left: '15%', right: '5%', bottom: '10%', top: '15%' },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      data: ['标准示例', '非人形', '3DGS', '极端尺度', '位置偏移', '极端宽高比', '噪声网格', '反转法线', '网格孔洞', '方向旋转', '部分身体', '断开组件', 'Mixamo FBX', '点云输入', '多组件'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    series: [
      {
        name: '成功',
        type: 'bar',
        stack: 'total',
        data: [6, 4, 1, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 1],
        itemStyle: { color: success },
        emphasis: { focus: 'series' }
      },
      {
        name: '降级/警告',
        type: 'bar',
        stack: 'total',
        data: [1, 0, 0, 6, 1, 6, 0, 1, 1, 0, 2, 0, 0, 0, 1],
        itemStyle: { color: warning },
        emphasis: { focus: 'series' }
      },
      {
        name: '失败',
        type: 'bar',
        stack: 'total',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 2, 0],
        itemStyle: { color: danger },
        emphasis: { focus: 'series' }
      }
    ]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // === 图 3: 方向变换对关节位置的影响 ===
  var chart3 = echarts.init(document.getElementById('chart-orientation'), null, { renderer: 'svg' });
  chart3.setOption({
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      appendToBody: true,
      backgroundColor: bg3,
      borderColor: rule,
      textStyle: { color: ink }
    },
    legend: {
      data: ['关节外率(%)', '形变幅度'],
      textStyle: { color: muted },
      top: 5
    },
    grid: { left: '8%', right: '8%', bottom: '15%', top: '15%' },
    xAxis: {
      type: 'category',
      data: ['原始', 'rot_90_x', 'rot_90_z', 'rot_180_y', 'flipped_y'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, rotate: 20, fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: '关节外率(%)',
        nameTextStyle: { color: muted },
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, formatter: '{value}%' },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      {
        type: 'value',
        name: '形变幅度',
        nameTextStyle: { color: muted },
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '关节外率(%)',
        type: 'bar',
        data: [76.9, 13.5, 15.4, 98.1, 86.5],
        itemStyle: {
          color: function(params) {
            var val = params.value;
            if (val > 80) return danger;
            if (val > 20) return warning;
            return success;
          }
        },
        barWidth: '40%',
        label: {
          show: true,
          position: 'top',
          color: muted,
          formatter: '{c}%'
        }
      },
      {
        name: '形变幅度',
        type: 'line',
        yAxisIndex: 1,
        data: [0.220, 0.008, 0.054, 3.138, 5.663],
        lineStyle: { color: accent2, width: 2 },
        itemStyle: { color: accent2 },
        symbol: 'diamond',
        symbolSize: 10
      }
    ]
  });
  window.addEventListener('resize', function() { chart3.resize(); });

  // === 图 4: Failure Case 模式热力图 ===
  var chart4 = echarts.init(document.getElementById('chart-heatmap'), null, { renderer: 'svg' });
  
  // 数据: [x_index, y_index, value]
  // x: 测试类别, y: 指标
  var heatData = [];
  var xCats = ['ninja基准', 'rot_90_x', 'rot_90_z', 'rot_180_y', 'flipped_y', 'scale_0.001', 'scale_1000', 'stretch_x_10', 'stretch_y_10', 'stretch_z_10', 'upper_half', 'lower_half', 'noisy', 'sphere', 'cube'];
  var yCats = ['关节外率(%)', '混合权重熵', 'BW Max', '形变幅度'];
  
  // 关节外率数据
  var outsideRatios = [76.9, 13.5, 15.4, 98.1, 86.5, 76.9, 78.8, 100, 48.1, 100, 78.8, 75.0, 1.9, 0, 0];
  var entropies = [2.60, 1.61, 2.35, 2.13, 2.53, 2.56, 2.56, 2.24, 2.04, 3.38, 2.65, 2.55, 2.95, 0.72, 1.22];
  var bwMaxes = [0.258, 0.514, 0.340, 0.376, 0.249, 0.266, 0.267, 0.399, 0.375, 0.116, 0.249, 0.255, 0.250, 0.785, 0.675];
  var deformations = [0.220, 0.008, 0.054, 3.138, 5.663, 5.336, 5.358, 29.520, 6.232, 12.526, 0.192, 0.217, 0.106, 3.742, 3.144];
  
  // 归一化到 0-100 范围用于热力图
  var maxEntropy = 3.5, maxBwMax = 1.0, maxDeform = 30;
  
  for (var i = 0; i < xCats.length; i++) {
    heatData.push([i, 0, outsideRatios[i]]);
    heatData.push([i, 1, (entropies[i] / maxEntropy * 100).toFixed(1)]);
    heatData.push([i, 2, (bwMaxes[i] / maxBwMax * 100).toFixed(1)]);
    heatData.push([i, 3, (deformations[i] / maxDeform * 100).toFixed(1)]);
  }
  
  chart4.setOption({
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      backgroundColor: bg3,
      borderColor: rule,
      textStyle: { color: ink },
      formatter: function(p) {
        var xName = xCats[p.value[0]];
        var yName = yCats[p.value[1]];
        var val = p.value[2];
        var realVal;
        if (yName === '关节外率(%)') realVal = outsideRatios[p.value[0]] + '%';
        else if (yName === '混合权重熵') realVal = entropies[p.value[0]].toFixed(2);
        else if (yName === 'BW Max') realVal = bwMaxes[p.value[0]].toFixed(3);
        else realVal = deformations[p.value[0]].toFixed(3);
        return xName + '<br/>' + yName + ': ' + realVal;
      }
    },
    grid: { left: '15%', right: '10%', bottom: '25%', top: '10%' },
    xAxis: {
      type: 'category',
      data: xCats,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, rotate: 45, fontSize: 10, interval: 0 }
    },
    yAxis: {
      type: 'category',
      data: yCats,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '2%',
      textStyle: { color: muted },
      inRange: { color: [bg2, accent2, warning, danger] }
    },
    series: [{
      type: 'heatmap',
      data: heatData,
      label: {
        show: true,
        color: ink,
        fontSize: 9,
        formatter: function(p) {
          var yName = yCats[p.value[1]];
          var val;
          if (yName === '关节外率(%)') val = outsideRatios[p.value[0]].toFixed(0) + '%';
          else if (yName === '混合权重熵') val = entropies[p.value[0]].toFixed(1);
          else if (yName === 'BW Max') val = bwMaxes[p.value[0]].toFixed(2);
          else val = deformations[p.value[0]].toFixed(1);
          return val;
        }
      },
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
      }
    }]
  });
  window.addEventListener('resize', function() { chart4.resize(); });

})();
