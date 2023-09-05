"""
This is where the implementation of the plugin code goes.
The chcekCurrentValue-class is imported from both run_plugin.py and run_debug.py
"""
import sys
import logging
from webgme_bindings import PluginBase

# Setup a logger
logger = logging.getLogger('chcekCurrentValue')
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stdout)  # By default it logs to stderr..
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


class chcekCurrentValue(PluginBase):
  def main(self):
    active_node = self.active_node
    core = self.core
    logger = self.logger
    self.namespace = None
    META = self.META
    nodeHash = {}
    for node in core.load_sub_tree(active_node):
      nodeHash[core.get_path(node)] = node
    
    def chechCurrentValue():
      values = {'TL':0,'TC':0, 'TR':0, 'BL':0, 'BC':0, 'BR':0}
      operations={}
      childrenIds = core.get_children_paths(active_node)
      for childId in childrenIds:
        if core.is_instance_of(nodeHash[childId],META['DIGIT']):
          values[core.get_attribute(nodeHash[childId],'position')] = core.get_attribute(nodeHash[childId],'value')
        if core.is_instance_of(nodeHash[childId],META['Operation']):
          order = core.get_attribute(nodeHash[childId],'order')
          src = core.get_attribute(nodeHash[core.get_pointer_path(nodeHash[childId], 'src')], 'position')
          dst = core.get_attribute(nodeHash[core.get_pointer_path(nodeHash[childId], 'dst')], 'position')
          opType = core.get_attribute(core.get_meta_type(nodeHash[childId]), 'name')
          operations[order] = {'src':src, 'dst':dst, 'type': opType}
      #logger.info(operations)
      for x in range(0,len(operations)):
        operation = operations[x]
        #logger.error(operation)
        if operation['type'] == 'Addition':
          values[operation['dst']] = values[operation['src']] + values[operation['dst']]
        elif operation['type'] == 'Subtraction':
          values[operation['dst']] = values[operation['src']] - values[operation['dst']]
        elif operation['type'] == 'Multiplication':
          values[operation['dst']] = values[operation['src']] * values[operation['dst']]
        elif operation['type'] == 'Division':
          values[operation['dst']] = values[operation['src']] / values[operation['dst']]
        
        values[operation['src']] = -1
        #logger.error(values)
        
      logger.info(values)
